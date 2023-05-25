from ...utils.custom_exception import CustomException


class BaseFixture:
    """
    Base class for declaring a fixture. Each fixture has to be loaded in the
    FixtureRunner.
    """

    def __init__(self, db_session):
        self.db_session = db_session
        self._repo = self.repo(db_session) if self.repo else None

    @classmethod
    @property
    def name(self):
        """Unique name that identifies this fixture"""
        raise NotImplementedError()

    @property
    def repo(self):
        """The repository for this fixture"""
        raise NotImplementedError()

    @property
    def data(self) -> list[dict]:
        """List of dicts to be used as kwargs for the insert() method"""
        raise NotImplementedError()

    @classmethod
    @property
    def required_fixtures(self) -> tuple | list:
        """Fixtures required to be run before this one"""
        return tuple()

    @property
    def unique_column_group(self) -> tuple | list:
        """
        Group of columns that identify an entry. Those values will be passed
        as an extra parameter in dict with the self.update_prefix prefix.

        If the insert method and the update_prefix are the default values, the
        behaviour would be to update those values where all the columns in
        self.unique_column_group match an existing row.

        E.g.
            unique_column_group = ('column_a', 'column_b')
            update_prefix = 'old__'
            insert = create_or_update
            data = {
                'column_a': 'A',
                'column_b': 'B',
                'column_c': 'C',
            }

            Would reflect in this function call:
            create_or_update(
                old__column_a='A',
                old__column_b='B',
                column_a='A',
                column_b='B',
                column_c='C',
            )
        """
        raise NotImplementedError()

    @property
    def update_prefix(self):
        """
        Prefix added to unique_column_group parameters, so it will update
        entries when applicable.
        """
        return self._repo.UPDATE_PREFIX

    @property
    def insert(self):
        """Method used to insert data. By default it is create_or_update()"""
        return self._repo.create_or_update

    def apply(self):
        for data in self.data:
            kwargs = data
            for unique_column in self.unique_column_group:
                if unique_column not in data:
                    self.db_session.rollback()
                    raise CustomException(
                        f"Missing column '{unique_column}' in "
                        f"{self.name}'s data.")
                kwargs[self.update_prefix + unique_column] =\
                    data[unique_column]
            self.insert(**kwargs)
