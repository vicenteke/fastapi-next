from sqlalchemy import (
    Column,
    BigInteger,
    ForeignKey,
    UniqueConstraint
)
from sqlalchemy.orm import relationship

from .base_model import BaseModel
from .role import Role
from .permission import Permission


class RolePermission(BaseModel):
    """ Join table between roles and permissions.
        Each role has many permissions.
    """
    __tablename__ = 'role_permission'

    role_pk = Column(BigInteger, ForeignKey(Role.pk), nullable=False)
    permission_pk = Column(BigInteger, ForeignKey(Permission.pk),
                           nullable=False, index=True)

    permission = relationship(Permission)
    role = relationship(Role)

    __table_args__ = (
        UniqueConstraint(permission_pk, role_pk, "rm_timestamp"),
    )
