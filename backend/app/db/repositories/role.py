from sqlalchemy.orm.session import Session

from .repository import Repository
from ..models.role import Role


class RoleRepository(Repository):
    def __init__(self, db_session: Session):
        super().__init__(db_session, Role)
