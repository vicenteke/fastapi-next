from fastapi import Depends, Security, HTTPException, status
from pydantic import ValidationError
from fastapi.security import OAuth2PasswordBearer, SecurityScopes
from typing import Annotated
from jose import jwt, JWTError, ExpiredSignatureError

from ..db.models.database import SessionLocal
from ..db.constants.scopes_permissions import ScopesPermissions
from ..db.repositories.authentication import AuthenticationRepository
from ..db.repositories.user import UserRepository

from ..schemas.token import TokenDataSchema
from ..schemas.user import UserSchema
from ..utils import get_from_env
from .database import get_db

oauth2_scheme = OAuth2PasswordBearer(
    tokenUrl="token", scopes=ScopesPermissions.scopes)


def _token_dependency(
        security_scopes: SecurityScopes,
        token: Annotated[str, Depends(oauth2_scheme)]
):
    """ Dependency that gets data from token """
    env = get_from_env(['FN_AUTH_ALGORITHM', 'FN_AUTH_SECRET'])
    SECRET = env['FN_AUTH_SECRET']
    ALGORITHM = env['FN_AUTH_ALGORITHM']

    if security_scopes.scopes:
        authenticate_value = f'Bearer scope="{security_scopes.scope_str}"'
    else:
        authenticate_value = "Bearer"

    try:
        payload = jwt.decode(token, SECRET, algorithms=[ALGORITHM])
        username: str = payload.get("sub")
        token_scopes = payload.get("scopes", [])
        if username is None:
            raise AuthenticationRepository.credentials_exception(
                authenticate_value=authenticate_value)
        for scope in security_scopes.scopes:
            if scope not in token_scopes:
                raise HTTPException(
                    status_code=status.HTTP_401_UNAUTHORIZED,
                    detail="Not enough permissions",
                    headers={"WWW-Authenticate": authenticate_value},
                )
        return TokenDataSchema(
            username=username,
            scopes=token_scopes,
        )
    except ExpiredSignatureError:
        raise AuthenticationRepository.credentials_exception(
            authenticate_value=authenticate_value,
            msg="Session expired, please login again")
    except (JWTError, ValidationError):
        raise AuthenticationRepository.credentials_exception(
            authenticate_value=authenticate_value)


def get_user(
    token_data: Annotated[TokenDataSchema, Security(_token_dependency)],
    db_session: Annotated[SessionLocal, Depends(get_db)]
) -> UserSchema:
    """ Returns and validates user based on JWT """
    with UserRepository(db_session) as user_repo:
        user = user_repo.one_or_none(login=token_data.username)
        if user is None:
            raise AuthenticationRepository.credentials_exception

    return user
