from pydantic import BaseModel


class UserSchema(BaseModel):
    name: str

    class Config:
        orm_mode = True
