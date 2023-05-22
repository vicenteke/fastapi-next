from pydantic import BaseModel

from ..db.constants.user_status import UserStatusEnum


class UserSchema(BaseModel):
    name: str | None
    status: UserStatusEnum
    email: str | None
    social_id: str | None

    class Config:
        orm_mode = True
