from .base_fixture import BaseFixture
from ..constants.permission import PermissionEnum
from ..constants.role import RoleEnum
from ..repositories.permission import PermissionRepository
from ..repositories.role import RoleRepository
from ..repositories.role_permission import RolePermissionRepository

from .permission import PermissionFixture
from .role import RoleFixture


class RolePermissionFixture(BaseFixture):
    @property
    def repo(self):
        return RolePermissionRepository

    @classmethod
    @property
    def required_fixtures(self) -> tuple:
        return (PermissionFixture, RoleFixture, )

    @property
    def unique_column_group(self):
        return ('role_pk', 'permission_pk', )

    @property
    def data(self) -> list[dict]:
        ADMIN_PERMISSIONS = [permission.name for permission in PermissionEnum]
        DEFAULT_PERMISSIONS = []

        admin_role_pk = RoleRepository(self.db_session)\
            .one(name=RoleEnum.ADMIN.name).pk
        default_role_pk = RoleRepository(self.db_session)\
            .one(name=RoleEnum.DEFAULT.name).pk
        permissions_list = PermissionRepository(self.db_session)\
            .get_name_and_pk()

        admin_data = [
            {
                'role_pk': admin_role_pk,
                'permission_pk': permissions_list[permission],
            } for permission in ADMIN_PERMISSIONS
        ]

        default_data = [
            {
                'role_pk': default_role_pk,
                'permission_pk': permissions_list[permission],
            } for permission in DEFAULT_PERMISSIONS
        ]

        return admin_data + default_data
