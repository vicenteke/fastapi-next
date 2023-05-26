from .base_fixture import BaseFixture
from ..constants.role import RoleEnum
from ..repositories.role import RoleRepository


class RoleFixture(BaseFixture):
    @property
    def repo(self):
        return RoleRepository

    @property
    def unique_column_group(self):
        return ('name', )

    @property
    def data(self) -> list[dict]:
        return [
            {
                'name': role.name,
                'description': role.value,
            } for role in RoleEnum
        ]
