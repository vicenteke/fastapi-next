"""001 - User RBAC

Revision ID: 61db65f2ceea
Revises: 
Create Date: 2023-05-21 11:34:53.627138

"""
from alembic import op
import sqlalchemy as sa
import app



# revision identifiers, used by Alembic.
revision = '61db65f2ceea'
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('login_settings',
    sa.Column('token_expiration', sa.BigInteger(), nullable=False),
    sa.Column('pk', sa.BigInteger(), nullable=False),
    sa.Column('created_on', sa.DateTime(), server_default=sa.text('now()'), nullable=False),
    sa.Column('updated_on', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
    sa.Column('rm_timestamp', sa.Integer(), server_default='0', nullable=True),
    sa.PrimaryKeyConstraint('pk', name=op.f('pk_login_settings')),
    sa.UniqueConstraint('rm_timestamp', name=op.f('uq_login_settings_rm_timestamp'))
    )
    op.create_index(op.f('ix_login_settings_login_settings_pk'), 'login_settings', ['pk'], unique=False)
    op.create_table('permissions',
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('description', sa.String(), nullable=False),
    sa.Column('pk', sa.BigInteger(), nullable=False),
    sa.Column('created_on', sa.DateTime(), server_default=sa.text('now()'), nullable=False),
    sa.Column('updated_on', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
    sa.Column('rm_timestamp', sa.Integer(), server_default='0', nullable=True),
    sa.PrimaryKeyConstraint('pk', name=op.f('pk_permissions'))
    )
    op.create_index(op.f('ix_permissions_permissions_name'), 'permissions', ['name'], unique=False)
    op.create_index(op.f('ix_permissions_permissions_pk'), 'permissions', ['pk'], unique=False)
    op.create_table('roles',
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('description', sa.String(), nullable=False),
    sa.Column('pk', sa.BigInteger(), nullable=False),
    sa.Column('created_on', sa.DateTime(), server_default=sa.text('now()'), nullable=False),
    sa.Column('updated_on', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
    sa.Column('rm_timestamp', sa.Integer(), server_default='0', nullable=True),
    sa.PrimaryKeyConstraint('pk', name=op.f('pk_roles'))
    )
    op.create_index(op.f('ix_roles_roles_name'), 'roles', ['name'], unique=False)
    op.create_index(op.f('ix_roles_roles_pk'), 'roles', ['pk'], unique=False)
    op.create_table('users',
    sa.Column('login', sa.String(), nullable=False),
    sa.Column('password', sa.String(), nullable=False),
    sa.Column('name', sa.String(), nullable=True),
    sa.Column('status', app.db.types.enum_column.IntEnumColumn(app.db.constants.user_status.UserStatusEnum,), server_default='0', nullable=False),
    sa.Column('email', sa.String(), nullable=True),
    sa.Column('social_id', sa.String(), nullable=True),
    sa.Column('pk', sa.BigInteger(), nullable=False),
    sa.Column('created_on', sa.DateTime(), server_default=sa.text('now()'), nullable=False),
    sa.Column('updated_on', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
    sa.Column('rm_timestamp', sa.Integer(), server_default='0', nullable=True),
    sa.PrimaryKeyConstraint('pk', name=op.f('pk_users')),
    sa.UniqueConstraint('login', 'rm_timestamp', name=op.f('uq_users_login'))
    )
    op.create_index(op.f('ix_users_users_login'), 'users', ['login'], unique=False)
    op.create_index(op.f('ix_users_users_pk'), 'users', ['pk'], unique=False)
    op.create_index(op.f('ix_users_users_status'), 'users', ['status'], unique=False)
    op.create_table('role_permission',
    sa.Column('role_pk', sa.BigInteger(), nullable=False),
    sa.Column('permission_pk', sa.BigInteger(), nullable=False),
    sa.Column('pk', sa.BigInteger(), nullable=False),
    sa.Column('created_on', sa.DateTime(), server_default=sa.text('now()'), nullable=False),
    sa.Column('updated_on', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
    sa.Column('rm_timestamp', sa.Integer(), server_default='0', nullable=True),
    sa.ForeignKeyConstraint(['permission_pk'], ['permissions.pk'], name=op.f('fk_role_permission_permission_pk_permissions')),
    sa.ForeignKeyConstraint(['role_pk'], ['roles.pk'], name=op.f('fk_role_permission_role_pk_roles')),
    sa.PrimaryKeyConstraint('pk', name=op.f('pk_role_permission')),
    sa.UniqueConstraint('permission_pk', 'role_pk', 'rm_timestamp', name=op.f('uq_role_permission_permission_pk'))
    )
    op.create_index(op.f('ix_role_permission_role_permission_permission_pk'), 'role_permission', ['permission_pk'], unique=False)
    op.create_index(op.f('ix_role_permission_role_permission_pk'), 'role_permission', ['pk'], unique=False)
    op.create_table('user_role',
    sa.Column('user_pk', sa.BigInteger(), nullable=False),
    sa.Column('role_pk', sa.BigInteger(), nullable=False),
    sa.Column('pk', sa.BigInteger(), nullable=False),
    sa.Column('created_on', sa.DateTime(), server_default=sa.text('now()'), nullable=False),
    sa.Column('updated_on', sa.DateTime(), server_default=sa.text('now()'), nullable=True),
    sa.Column('rm_timestamp', sa.Integer(), server_default='0', nullable=True),
    sa.ForeignKeyConstraint(['role_pk'], ['roles.pk'], name=op.f('fk_user_role_role_pk_roles')),
    sa.ForeignKeyConstraint(['user_pk'], ['users.pk'], name=op.f('fk_user_role_user_pk_users')),
    sa.PrimaryKeyConstraint('pk', name=op.f('pk_user_role')),
    sa.UniqueConstraint('user_pk', 'rm_timestamp', name=op.f('uq_user_role_user_pk'))
    )
    op.create_index(op.f('ix_user_role_user_role_pk'), 'user_role', ['pk'], unique=False)
    op.create_index(op.f('ix_user_role_user_role_user_pk'), 'user_role', ['user_pk'], unique=False)
    # ### end Alembic commands ###


def downgrade() -> None:
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_index(op.f('ix_user_role_user_role_user_pk'), table_name='user_role')
    op.drop_index(op.f('ix_user_role_user_role_pk'), table_name='user_role')
    op.drop_table('user_role')
    op.drop_index(op.f('ix_role_permission_role_permission_pk'), table_name='role_permission')
    op.drop_index(op.f('ix_role_permission_role_permission_permission_pk'), table_name='role_permission')
    op.drop_table('role_permission')
    op.drop_index(op.f('ix_users_users_status'), table_name='users')
    op.drop_index(op.f('ix_users_users_pk'), table_name='users')
    op.drop_index(op.f('ix_users_users_login'), table_name='users')
    op.drop_table('users')
    op.drop_index(op.f('ix_roles_roles_pk'), table_name='roles')
    op.drop_index(op.f('ix_roles_roles_name'), table_name='roles')
    op.drop_table('roles')
    op.drop_index(op.f('ix_permissions_permissions_pk'), table_name='permissions')
    op.drop_index(op.f('ix_permissions_permissions_name'), table_name='permissions')
    op.drop_table('permissions')
    op.drop_index(op.f('ix_login_settings_login_settings_pk'), table_name='login_settings')
    op.drop_table('login_settings')
    # ### end Alembic commands ###
