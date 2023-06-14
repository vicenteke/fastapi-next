from enum import unique
from ..types.enum_class import EnumClass
from .scopes_permissions import ScopesPermissions


@unique
@ScopesPermissions.include
class PermissionEnum(EnumClass):
    IS_ROOT_USER = "IS_ROOT_USER"
    IS_ADMIN = "IS_ADMIN"
