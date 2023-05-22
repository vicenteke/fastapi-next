from typing import Union
from fastapi import FastAPI

from .app.routers.authentication import router as authentication_router
from .app.routers.user import router as user_router

app = FastAPI()

app.include_router(authentication_router)
app.include_router(
    user_router,
    prefix="/users",
    tags=["users"]
)


@app.get("/")
def read_root():
    return {"Hello": "World"}
