from sqlalchemy.orm.session import Session

from .repository import Repository
from ..models.role_permission import RolePermission


class RolePermissionRepository(Repository):
    def __init__(self, db_session: Session):
        super().__init__(db_session, RolePermission)
