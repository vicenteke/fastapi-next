from pydantic import BaseModel


class TokenSchema(BaseModel):
    access_token: str
    token_type: str


class TokenDataSchema(BaseModel):
    username: str | None = None
    expiration_timestamp: int | None = None
