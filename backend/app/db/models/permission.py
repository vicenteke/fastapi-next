from sqlalchemy import (
    Column,
    String
)

from .base_model import BaseModel


class Permission(BaseModel):
    """
    ORM for "permissions" table.

    Attributes
    ----------
    name : str
        the actual permission name. Should match a permissions enum.
    description : str
        user-friendly description of the permission.
    """
    __tablename__ = 'permissions'

    name = Column(String, nullable=False, index=True)
    description = Column(String, nullable=False)
