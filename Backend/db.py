from sqlmodel import Session, create_engine
DATABASE_URL = "postgresql://postgres:st1nkylama@localhost:5432/postgres"
engine = create_engine(DATABASE_URL)

def get_db():
    with Session(engine) as session:
        yield session