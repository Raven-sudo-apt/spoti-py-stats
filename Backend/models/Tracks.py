from sqlmodel import Field, SQLModel
import uuid
from datetime import datetime

class Track(SQLModel, table=True):
    __tablename__ = "tracks"
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    filename: str
    title: str = ""
    artist_name: str = ""
    created_at: datetime = Field(default_factory=datetime.now)
    owner_id: uuid.UUID = Field(foreign_key="users.id")
