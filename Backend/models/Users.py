from sqlmodel import Field, SQLModel
import uuid
from datetime import datetime
class User(SQLModel, table=True):
    __tablename__ = "users"
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    display_name: str
    email: str = Field(unique=True)
    password_hash: str
    created_at: datetime = Field(default_factory=datetime.now)
    share_activity: bool = Field(default=True)
    share_local_metadata: bool = Field(default=True)
    pronouns: str | None
    profile_picture: str | None
    