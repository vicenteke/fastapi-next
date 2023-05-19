import os
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# TODO: get from config.json
path = os.getcwd()
if path.endswith('backend'):
    path = '/'.join(path.split('/')[:-1])
load_dotenv(f'{path}/.env')

SQLALCHEMY_DATABASE_URL = os.environ['FN_PSQL_URI']
engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()
