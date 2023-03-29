from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from ..dependencies.database import get_db
from ..schemas.user import UserSchema
from ..db.models.user import Users

router = APIRouter()

@router.get("/", response_model=list[UserSchema])
async def read_users(db_session: Session = Depends(get_db)):
    return db_session.query(Users).all()


@router.get("/{username}", response_model=UserSchema)
async def read_user(username: str, db_session: Session = Depends(get_db)):
    return db_session.query(Users).filter(Users.name == username).one_or_none()
