from fastapi import APIRouter, Depends
from sqlalchemy.orm.session import Session

from ..dependencies.database import get_db
from ..schemas.default import DefaultSchema
from ..schemas.user import UserSchema
from ..db.repositories.users import UsersRepository

router = APIRouter()


@router.get("/", response_model=list[UserSchema])
async def read_users(db_session: Session = Depends(get_db)):
    with UsersRepository(db_session) as repo:
        return repo.all()


@router.get("/{username}", response_model=UserSchema | DefaultSchema)
async def read_user(username: str, db_session: Session = Depends(get_db)):
    with UsersRepository(db_session) as repo:
        res = repo.one_or_none(include_deleted=True, name=username)
    if res:
        return res

    return {
        'details': "No entry found",
    }
