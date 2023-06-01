from enum import unique
from ..db.types.enum_class import EnumClass


@unique
class Formatting(EnumClass):
    DATETIME = "%Y/%m/%d %H:%M:%S"
