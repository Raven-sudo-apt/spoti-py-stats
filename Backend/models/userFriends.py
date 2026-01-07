from datetime import datetime
from sqlmodel import Field, SQLModel
import uuid

class userFriend(SQLModel, table=True):
    __tablename__ = "user_friends"
    user_id: uuid.UUID = Field(foreign_key="users.id")
    friend_id: uuid.UUID = Field(foreign_key="users.id")
    friendSince: datetime = Field(default_factory=datetime.now)