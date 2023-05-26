from .base_fixture import BaseFixture
from ..constants.permissions import PermissionsEnum
from ..repositories.permission import PermissionRepository


class PermissionFixture(BaseFixture):
    @property
    def repo(self):
        return PermissionRepository

    @property
    def unique_column_group(self):
        return ('name', )

    @property
    def data(self) -> list[dict]:
        return [
            {
                'name': permission.name,
                'description': permission.value,
            } for permission in PermissionsEnum
        ]
