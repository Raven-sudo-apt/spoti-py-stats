from sqlmodel import BaseModel, Field

class Artist(BaseModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str
    genres: list
    followers: int
    albums: list
    tracks: list
    

    