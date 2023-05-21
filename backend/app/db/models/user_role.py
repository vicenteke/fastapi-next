from sqlalchemy import (
    Column,
    BigInteger,
    ForeignKey,
    UniqueConstraint
)
from sqlalchemy.orm import relationship

from .base_model import BaseModel
from .role import Role
from .user import User


class UserRole(BaseModel):
    """ Join table between users and roles. Each user has only one role. """
    __tablename__ = 'user_role'

    user_pk = Column(BigInteger, ForeignKey(User.pk), nullable=False,
                     index=True)
    role_pk = Column(BigInteger, ForeignKey(Role.pk), nullable=False)

    user = relationship(User)
    role = relationship(Role)

    __table_args__ = (
        UniqueConstraint(user_pk, "rm_timestamp"),
    )
