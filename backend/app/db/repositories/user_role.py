from sqlalchemy.orm.session import Session

from .repository import Repository
from ..models.user_role import UserRole


class UserRoleRepository(Repository):
    def __init__(self, db_session: Session):
        super().__init__(db_session, UserRole)
