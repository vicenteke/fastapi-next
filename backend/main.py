from typing import Union
from fastapi import FastAPI

from .app.routers.users import router as users_router

app = FastAPI()

app.include_router(
    users_router,
    prefix="/users",
    tags=["users"]
)


@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}
