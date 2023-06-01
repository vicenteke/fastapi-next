from fastapi import APIRouter, Depends, Security
from sqlalchemy.orm.session import Session
from typing import Annotated

from ..dependencies.database import get_db
from ..dependencies.authentication import get_user
from ..schemas.default import DefaultSchema
from ..schemas.user import UserSchema, TestUserSchema
from ..db.constants.permission import PermissionEnum
from ..db.repositories.user import UserRepository

router = APIRouter()


@router.get("/", response_model=list[UserSchema])
async def read_users(db_session: Session = Depends(get_db)):
    with UserRepository(db_session) as repo:
        return repo.all()


@router.get("/me", response_model=UserSchema | DefaultSchema)
async def read_user(
    user: Annotated[
        UserSchema,
        Security(get_user, scopes=[PermissionEnum.IS_ROOT_USER.name])]
):
    return user
