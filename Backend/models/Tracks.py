from sqlmodel import Field, SQLModel
import uuid
from datetime import datetime

class Track(SQLModel , table=True):
    __tablename__ = "tracks"
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    title: str
    artist_name: str
    album_title: str
    duration_seconds: int
    is_licensed: bool
    licensed_audio_url: str | None
    cover_url: str | None
    explicit: bool
    created_at: datetime = Field(default_factory=datetime.now)
