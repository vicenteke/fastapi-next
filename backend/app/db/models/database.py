import os
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy import MetaData

path = os.getcwd()
if path.endswith('backend'):
    path = '/'.join(path.split('/')[:-1])
load_dotenv(f'{path}/.env')

SQLALCHEMY_DATABASE_URL = os.environ['FN_PSQL_URI']
engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

naming_convention = {
    "ix": 'ix_%(table_name)s_%(column_0_label)s',
    "uq": "uq_%(table_name)s_%(column_0_name)s",
    "ck": "ck_%(table_name)s_%(column_0_name)s",
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    "pk": "pk_%(table_name)s"
}
Base.metadata = MetaData(naming_convention=naming_convention)
