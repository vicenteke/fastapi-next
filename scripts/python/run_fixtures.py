from backend.app.db.fixtures.fixture_runner import FixtureRunner
from backend.app.db.fixtures.permission import PermissionFixture
from backend.app.db.models.database import SessionLocal


class AllFixures(FixtureRunner):
    @property
    def fixtures(self):
        return [
            PermissionFixture,
        ]


if __name__ == '__main__':
    db_session = SessionLocal()
    AllFixures(db_session).run()
