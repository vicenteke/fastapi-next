from ..db.models.database import SessionLocal


def get_db() -> SessionLocal:
    """ Dependency to create a DB session """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
