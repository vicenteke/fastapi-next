from sqlalchemy import (
    Column,
    String,
    UniqueConstraint,
)
from ..constants.user_status import UserStatusEnum
from ..types.enum_column import IntEnumColumn
from .base_model import BaseModel


class User(BaseModel):
    """
    ORM for "users" table. Users have roles and roles have permissions to
    access certain pages or features.

    Attributes
    ----------
    login : str
        username used for login.
    password : str
        hashed password.
    name : str
        the actual role name.
    status : UserStatusEnum
        current user status.
    email: str
        user's email.
    social_id: str
        user's social ID. In Brazil, it can be CPF or RG, for instance.
    """
    __tablename__ = 'users'

    login = Column(String, nullable=False, index=True)
    password = Column(String, nullable=False)
    name = Column(String, nullable=True)
    status = Column(IntEnumColumn(UserStatusEnum), nullable=False, index=True,
                    server_default=str(UserStatusEnum.DEFAULT.value))
    email = Column(String, nullable=True)
    social_id = Column(String, nullable=True)

    __table_args__ = (
        UniqueConstraint(login, "rm_timestamp"),
    )
