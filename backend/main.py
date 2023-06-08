from fastapi import FastAPI

from .app.routers import (
    authentication,
    permission,
    user,
)

app = FastAPI()

app.include_router(authentication.router)
app.include_router(permission.router)
app.include_router(
    user.router,
    prefix="/users",
    tags=["users"]
)


@app.get("/")
def read_root():
    return {"Hello": "World"}
