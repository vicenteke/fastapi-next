from sqlalchemy.orm.session import Session

from .repository import Repository
from ..models.permission import Permission


class PermissionRepository(Repository):
    def __init__(self, db_session: Session):
        super().__init__(db_session, Permission)
