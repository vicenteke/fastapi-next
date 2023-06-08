from pydantic import BaseModel


class PermissionSchema(BaseModel):
    name: str
    description: str
