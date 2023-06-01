from datetime import datetime
from pydantic import BaseModel, Field
from typing import Optional

from ..utils.formatting import Formatting


def encode_datetime(value: datetime):
    return value.strftime(Formatting.DATETIME.value)


def create_base_schemas(schema: BaseModel):
    """
    Returns base schemas according to a provided schema. That means it returns
    a schema for data creation/update and another one for data retrival.

    The idea is to provide a schema with the table columns and use this method
    to translate it into a common interface. Validation can be included in
    base schemas as well.

    NOTE that naming is important, as the __name__ and __qualname__ properties
    are set explicitly.

    E.g.
    class MyTableSchema(BaseModel):
        column_a: int
        column_B: Optional[str] = None

    MyTableSchema, CreateMyTableSchema = create_base_schemas(MyTableModel)
    """
    original_schema_name = schema.__name__

    class _BaseSchema(schema):
        pk: Optional[int] = Field(gt=0)

        class Config:
            orm_mode = True
            use_enum_values = True
            json_encoders = {
                datetime: encode_datetime
            }

    class _CreateSchema(schema):
        class Config:
            orm_mode = True
            use_enum_values = True
            json_encoders = {
                datetime: encode_datetime
            }

    _BaseSchema.__name__ = original_schema_name
    _BaseSchema.__qualname__ = original_schema_name
    _CreateSchema.__name__ = f'Create{original_schema_name}'
    _CreateSchema.__qualname__ = f'Create{original_schema_name}'

    return _BaseSchema, _CreateSchema
