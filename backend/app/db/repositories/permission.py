from sqlalchemy.orm.session import Session

from .repository import Repository
from ..models.permission import Permission


class PermissionRepository(Repository):
    def __init__(self, db_session: Session, user=None):
        super().__init__(db_session, Permission, user)

    def get_name_and_pk(self, **kwargs):
        """
        Returns a dict where the keys are the permission names and the
        values their PK.
        """
        entries = self.all(**kwargs)
        return {entry.name: entry.pk for entry in entries}
