from fastapi import HTTPException, status
from passlib.context import CryptContext
from datetime import datetime, timedelta
from jose import jwt
from ...utils import get_from_env


class AuthenticationRepository:
    """ Encapsulates queries and methods related to authentication """

    def __init__(self, db_session):
        self.db_session = db_session
        env = get_from_env(['FN_AUTH_ALGORITHM', 'FN_AUTH_SECRET'])
        self.SECRET = env['FN_AUTH_SECRET']
        self.ALGORITHM = env['FN_AUTH_ALGORITHM']
        self.pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

    def verify_password(self, plain_password, hashed_password):
        return self.pwd_context.verify(plain_password, hashed_password)

    def get_password_hash(self, password):
        return self.pwd_context.hash(password)

    def create_access_token(self, data: dict,
                            expires_delta: timedelta | None = None):
        """ Returns encoded JWT for "data" """
        to_encode = data.copy()
        if expires_delta:
            expire = datetime.utcnow() + expires_delta
        else:
            # if no expires_delta provided, it means we want to remember the
            # user login. Using 3 months as default
            expire = datetime.utcnow() + timedelta(weeks=13)
        to_encode.update({"exp": expire})
        encoded_jwt = jwt.encode(to_encode, self.SECRET,
                                 algorithm=self.ALGORITHM)
        return encoded_jwt

    @classmethod
    @property
    def credentials_exception(cls):
        return HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
