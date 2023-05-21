from sqlalchemy import (
    Column,
    String
)

from .base_model import BaseModel


class Role(BaseModel):
    """
    ORM for "role" table. Users have roles and roles have permissions to access
    certain pages or features.

    Attributes
    ----------
    name : str
        the actual role name.
    description : str
        user-friendly description of the role.
    """
    __tablename__ = 'roles'

    name = Column(String, nullable=False, index=True)
    description = Column(String, nullable=False)
