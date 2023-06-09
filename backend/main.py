from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

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

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"Hello": "World"}
