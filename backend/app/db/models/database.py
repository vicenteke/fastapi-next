import os
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# TODO: get from config.json
load_dotenv('/home/vicente/Desktop/projects/fastapi-next/.env')

SQLALCHEMY_DATABASE_URL = os.environ['FN_PSQL_URI']
engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
