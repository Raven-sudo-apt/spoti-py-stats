from sqlmodel import Field, SQLModel
from typing import Optional
from datetime import datetime

class TrackCreate(SQLModel):
    title: str
    artist_name: str
    album_title: str
    duration_seconds: int
    is_licensed: bool
    licensed_audio_url: str | None
    cover_url: Optional[str] = None
    explicit: Optional[bool] = None
    created_at: datetime = Field(default_factory=datetime.now)

class TrackUpdate(SQLModel):
    title: Optional[str] = None
    artist_name: Optional[str] = None
    album_title: Optional[str] = None
    is_licensed: Optional[bool] = None
    cover_url: Optional[str] = None
    explicit: Optional[bool] = None