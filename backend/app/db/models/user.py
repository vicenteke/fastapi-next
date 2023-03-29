from sqlalchemy import (
    Column,
    String
)

from .base_model import BaseModel


class Users(BaseModel):
    """ Base table model from which actual tables must derive, so they include
        default fields.
    """
    __tablename__ = 'users'

    name = Column(String, nullable=False, index=True)
