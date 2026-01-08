from sqlmodel import create_engine
DATABASE_URL = "postgresql://postgres:st1nkylama@localhost:5432/postgres"
engine = create_engine(DATABASE_URL)

