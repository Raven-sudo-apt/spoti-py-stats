import uuid
from sqlmodel import Field, SQLModel
from typing import Optional
from datetime import datetime

class TrackCreate(SQLModel):
    title: Optional[str] = None
    filename: Optional[str] = None
    # artist_name: Optional[str] = None
    # album_title: Optional[str] = None
    # duration_seconds: Optional[int] = None
    # audio_url: Optional[str] = None
    # cover_url: Optional[str] = None
    # explicit: Optional[bool] = None
    created_at: datetime = Field(default_factory=datetime.now)
    owner_id: uuid.UUID = Field(foreign_key="users.id")

class TrackUpdate(SQLModel):
    cover_url: Optional[str] = None
    explicit: Optional[bool] = None