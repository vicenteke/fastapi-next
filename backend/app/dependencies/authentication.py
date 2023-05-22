from fastapi import Depends, status, HTTPException
from fastapi.security import OAuth2PasswordBearer
from typing import Annotated
from jose import jwt, JWTError

from ..db.models.database import SessionLocal
from ..db.models.user import User
from ..db.repositories.authentication import AuthenticationRepository
from ..db.repositories.user import UserRepository

from ..schemas.token import TokenDataSchema
from ..schemas.user import UserSchema
from ..utils import get_from_env
from .database import get_db

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token")


def _token_dependency(token: Annotated[str, Depends(oauth2_scheme)]):
    """ Dependency that gets data from token """
    env = get_from_env(['FN_AUTH_ALGORITHM', 'FN_AUTH_SECRET'])
    SECRET = env['FN_AUTH_SECRET']
    ALGORITHM = env['FN_AUTH_ALGORITHM']
    try:
        payload = jwt.decode(token, SECRET, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        expiration_timestamp: str = payload.get("exp")
        if username is None:
            raise AuthenticationRepository.credentials_exception
        return TokenDataSchema(
            username=username, expiration_timestamp=expiration_timestamp)
    except JWTError:
        raise AuthenticationRepository.credentials_exception


def get_user(
    token_data: Annotated[TokenDataSchema, Depends(_token_dependency)],
    db_session: Annotated[SessionLocal, Depends(get_db)]
) -> UserSchema:
    """ Returns and validates user based on JWT """
    with UserRepository(db_session) as user_repo:
        user = user_repo.one_or_none(login=token_data.username)
        if user is None:
            raise AuthenticationRepository.credentials_exception

    return user
