from sqlalchemy.orm.session import Session

from .repository import Repository
from ..models.user import User


class UserRepository(Repository):
    def __init__(self, db_session: Session):
        super().__init__(db_session, User)
