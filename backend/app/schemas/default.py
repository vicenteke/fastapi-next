from pydantic import BaseModel, Field
from pydantic.generics import GenericModel
from typing import Any, Generic, TypeVar


class DefaultSchema(BaseModel):
    """Default response schema to be used on most use cases"""
    success: bool = True
    details: str = ""
    data: Any = None


TableModel = TypeVar("TableModel")
ResponseModel = TypeVar("ResponseModel")


class TableSchema(GenericModel, Generic[TableModel]):
    """Default response for table routes"""
    total: int = Field(gte=0)
    rows: list[TableModel]


class ResponseSchema(GenericModel, Generic[ResponseModel]):
    """Default response for default routes"""
    detail: str = None
    data: ResponseModel = None
