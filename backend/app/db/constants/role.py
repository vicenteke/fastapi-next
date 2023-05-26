from enum import unique
from ..types.enum_class import EnumClass


@unique
class RoleEnum(EnumClass):
    DEFAULT = 'DEFAULT'
    ADMIN = 'ADMINISTRATOR'
