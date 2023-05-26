from traceback import print_exc

from ...utils.custom_exception import CustomException
from .base_fixture import BaseFixture


class FixtureRunner:
    """Class responsible to apply a list of fixtures"""

    def __init__(self, db_session):
        self.db_session = db_session
        self._applied_fixtures = []

    @property
    def fixtures(self) -> list[BaseFixture]:
        """List of fixtures to be applied by this runner"""
        raise NotImplementedError()

    def _apply_fixture(self, fixture):
        fixture(self.db_session).apply()
        self.db_session.commit()
        self._applied_fixtures.append(fixture.name)

    def _has_pending_required_fixtures(self, fixture):
        for required_fixture in fixture.required_fixtures:
            if required_fixture.name not in self._applied_fixtures:
                return True
        return False

    def run(self):
        try:
            for fixture in self.fixtures:
                # Check if all fixtures are BaseFixtures
                if not issubclass(fixture, BaseFixture)\
                        and not isinstance(fixture, BaseFixture):
                    raise CustomException(
                        f"{fixture} is not a BaseFixture instance.")

            fixtures_to_run = self.fixtures
            failures_left = sum(range(len(self.fixtures))) + 1   # Worst case
            while len(fixtures_to_run) and failures_left > 0:
                # Runs all the fixtures
                fixture = fixtures_to_run.pop(0)
                if self._has_pending_required_fixtures(fixture):
                    failures_left -= 1
                    fixtures_to_run.append(fixture)
                elif fixture.name not in self._applied_fixtures:
                    self._apply_fixture(fixture)

            if failures_left <= 0:
                raise CustomException(
                    'Max attempts to run fixtures faced. Review your '
                    f'required_fixtures for {fixtures_to_run}')
        except Exception as e:
            self.db_session.rollback()
            print("[ERROR] Failed to apply fixtures:", e)
            print_exc()
        else:
            self.db_session.commit()
