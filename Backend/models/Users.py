from enum import unique, Enum
from sqlmodel import BaseModel, Field

class User(BaseModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str
    username: str = Field(unique=True)
    email: str | None = Field(unique=True)
    hashed_password: str
    statistics: dict
    friends: list
    artistsFollowed: list
    savedPlaylists: list