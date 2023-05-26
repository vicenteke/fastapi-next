from backend.app.db.models.database import SessionLocal
from backend.app.db.fixtures.all import AllFixures

if __name__ == '__main__':
    db_session = SessionLocal()
    AllFixures(db_session).run()
