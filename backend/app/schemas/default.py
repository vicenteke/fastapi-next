from pydantic import BaseModel, Field
from typing import Any


class DefaultSchema(BaseModel):
    """ Default response schema to be used on most use cases """

    success: bool = True
    details: str = ""
    data: Any = None
