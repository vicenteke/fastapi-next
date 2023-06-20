from datetime import datetime
from pydantic import BaseModel, Field
from typing import Optional
from pydantic.main import ModelMetaclass

from ..utils.formatting import Formatting


def encode_datetime(value: datetime):
    return value.strftime(Formatting.DATETIME.value)


def create_base_schemas(schema: BaseModel):
    """
    Returns base schemas according to a provided schema. That means it returns
    a schema for data creation/update, another one for data retrival and one
    for table queries.

    The idea is to provide a schema with the table columns and use this method
    to translate it into a common interface. Validation can be included in
    base schemas as well.

    NOTE that naming is important, as the __name__ and __qualname__ properties
    are set explicitly.

    E.g.
    class MyTableSchema(BaseModel):
        column_a: int
        column_B: Optional[str] = None

    MyTableSchema, CreateMyTableSchema, TableMyTableSchema =\
        create_base_schemas(MyTableModel)
    """
    original_schema_name = schema.__name__

    class _BaseSchema(schema):
        pk: Optional[int] = Field(gt=0)

        class Config:
            orm_mode = True
            use_enum_values = True
            json_encoders = {datetime: encode_datetime}

    class _CreateSchema(schema):
        class Config:
            orm_mode = True
            use_enum_values = True
            json_encoders = {datetime: encode_datetime}

    _BaseSchema.__name__ = original_schema_name
    _BaseSchema.__qualname__ = original_schema_name
    _CreateSchema.__name__ = f"Create{original_schema_name}"
    _CreateSchema.__qualname__ = f"Create{original_schema_name}"

    # Creating TableSchema
    class AllOptional(ModelMetaclass):
        """Creates a schema where all fields are optional"""
        # https://stackoverflow.com/questions/67699451/make-every-field-as-optional-with-pydantic
        def __new__(cls, name, bases, namespaces, **kwargs):
            annotations = namespaces.get("__annotations__", {})
            for base in bases:
                annotations.update(base.__annotations__)
            for field in annotations:
                if not field.startswith("__"):
                    annotations[field] = Optional[annotations[field]]
            namespaces["__annotations__"] = annotations
            return super().__new__(cls, name, bases, namespaces, **kwargs)

    class _TableSchema(schema, metaclass=AllOptional):
        pk: Optional[int] = Field(gt=0)
        page: Optional[int] = Field(ge=0)
        per_page: Optional[int] = Field(ge=0)

        class Config:
            orm_mode = True
            use_enum_values = True
            json_encoders = {datetime: encode_datetime}

    _TableSchema.__name__ = f"Table{original_schema_name}"
    _TableSchema.__qualname__ = f"Table{original_schema_name}"

    return _BaseSchema, _CreateSchema, _TableSchema
