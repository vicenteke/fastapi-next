from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from typing import Annotated
from sqlalchemy.orm.session import Session
from datetime import timedelta

from ..dependencies.database import get_db
from ..schemas.token import TokenSchema
from ..db.repositories.authentication import AuthenticationRepository
from ..db.repositories.login_settings import LoginSettingsRepository
from ..db.repositories.user import UserRepository

router = APIRouter()


@router.post("/token", response_model=TokenSchema)
async def crete_token(
        form_data: Annotated[OAuth2PasswordRequestForm, Depends()],
        db_session: Session = Depends(get_db)
):
    user_repo = UserRepository(db_session)
    user = user_repo.one_or_none(login=form_data.username)
    if user is None:
        raise AuthenticationRepository.credentials_exception()

    auth_repo = AuthenticationRepository(db_session)
    res = auth_repo.verify_password(form_data.password, user.password)
    if not res:
        raise AuthenticationRepository.credentials_exception()

    login_settings = LoginSettingsRepository(db_session).one()
    token_data = {
        "sub": user.login,
        "scopes": user_repo.permissions(user)
    }
    access_token = auth_repo.create_access_token(
        token_data,
        expires_delta=timedelta(seconds=login_settings.token_expiration)
    )

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }
