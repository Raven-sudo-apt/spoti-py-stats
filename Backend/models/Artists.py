from sqlmodel import BaseModel, Field

class Artist(BaseModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str
    genre: str
    popularity: int