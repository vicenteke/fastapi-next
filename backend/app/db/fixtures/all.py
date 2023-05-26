from .fixture_runner import FixtureRunner
from .permission import PermissionFixture
from .role import RoleFixture
from .role_permission import RolePermissionFixture


class AllFixures(FixtureRunner):
    @property
    def fixtures(self):
        return [
            RolePermissionFixture,
            PermissionFixture,
            RoleFixture,
        ]
