from enum import unique
from ..types.enum_class import EnumClass


@unique
class UserStatusEnum(EnumClass):
    """
    Lists possible user status.

    Attributes
    ----------
    DEFAULT:
        User is functional, as usual.
    """
    DEFAULT = 0
