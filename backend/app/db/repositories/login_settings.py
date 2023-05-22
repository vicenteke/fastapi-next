from sqlalchemy.orm.session import Session

from .repository import Repository
from ..models.login_settings import LoginSettings


class LoginSettingsRepository(Repository):
    def __init__(self, db_session: Session):
        super().__init__(db_session, LoginSettings)
