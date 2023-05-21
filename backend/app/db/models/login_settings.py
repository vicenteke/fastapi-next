from sqlalchemy import (
    BigInteger,
    Column,
    UniqueConstraint,
)

from .base_model import BaseModel


class LoginSettings(BaseModel):
    """
    Stores useful login settings. There shall be only one entry.

    Attributes
    ----------
    token_expiration : int
        token expiration time in seconds.
    """
    __tablename__ = 'login_settings'

    token_expiration = Column(BigInteger, nullable=False)

    __table_args__ = (
        UniqueConstraint("rm_timestamp"),
    )
