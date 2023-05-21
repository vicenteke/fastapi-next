import os
from logging.config import fileConfig

from sqlalchemy import engine_from_config
from sqlalchemy import pool

from alembic import context

# this is the Alembic Config object, which provides
# access to the values within the .ini file in use.
config = context.config

# Interpret the config file for Python logging.
# This line sets up loggers basically.
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

# add your model's MetaData object here
# for 'autogenerate' support
# from myapp import mymodel
# target_metadata = mymodel.Base.metadata
from app.db import models
target_metadata = models.database.Base.metadata

# other values from the config, defined by the needs of env.py,
# can be acquired:
# my_important_option = config.get_main_option("my_important_option")
# ... etc.

config.set_main_option('sqlalchemy.url', os.environ['FN_PSQL_URI'])


def custom_column_types_rendering():
    import re
    import alembic
    from app.db.types.enum_column import EnumColumn
    from alembic.autogenerate.render import (
        _user_defined_render,
        _sqlalchemy_autogenerate_prefix,
        _user_autogenerate_prefix
    )

    def _repr_type(type_, autogen_context):
        rendered = _user_defined_render("type", type_, autogen_context)
        if rendered is not False:
            return rendered

        if isinstance(type_, EnumColumn):
            tp_prefix = _user_autogenerate_prefix(autogen_context, type_.values)
            tp = "%s%s" % (tp_prefix, type_.values.__name__)
            prefix = _user_autogenerate_prefix(autogen_context, type_)
            tmp = "%s%r" % (prefix, type_,)
            tmp = tmp.split('(')
            return tmp[0] + '(' + ("%s," % (tp,)) + tmp[1]

        mod = type(type_).__module__
        imports = autogen_context.imports
        if mod.startswith("sqlalchemy.dialects"):
            dname = re.match(r"sqlalchemy\.dialects\.(\w+)", mod).group(1)
            if imports is not None:
                imports.add("from sqlalchemy.dialects import %s" % dname)
            return "%s.%r" % (dname, type_)
        elif mod.startswith("sqlalchemy."):
            prefix = _sqlalchemy_autogenerate_prefix(autogen_context)
            return "%s%r" % (prefix, type_)
        else:
            prefix = _user_autogenerate_prefix(autogen_context, type_)
            return "%s%r" % (prefix, type_)

    alembic.autogenerate.render._repr_type = _repr_type


def run_migrations_offline() -> None:
    """Run migrations in 'offline' mode.

    This configures the context with just a URL
    and not an Engine, though an Engine is acceptable
    here as well.  By skipping the Engine creation
    we don't even need a DBAPI to be available.

    Calls to context.execute() here emit the given string to the
    script output.

    """
    custom_column_types_rendering()
    url = config.get_main_option("sqlalchemy.url")
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online() -> None:
    """Run migrations in 'online' mode.

    In this scenario we need to create an Engine
    and associate a connection with the context.

    """
    custom_column_types_rendering()
    connectable = engine_from_config(
        config.get_section(config.config_ini_section, {}),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    with connectable.connect() as connection:
        context.configure(
            connection=connection, target_metadata=target_metadata
        )

        with context.begin_transaction():
            context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
