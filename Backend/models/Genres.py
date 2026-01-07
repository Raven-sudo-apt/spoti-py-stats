from sqlmodel import Field, SQLModel
import uuid

class Genre(SQLModel, table=True):
    __tablename__ = "genres"
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    name: str