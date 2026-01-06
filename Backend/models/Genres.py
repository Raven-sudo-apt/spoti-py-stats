from sqlmodel import Field, BaseModel

class Genre(BaseModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str