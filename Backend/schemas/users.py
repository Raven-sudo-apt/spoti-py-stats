from sqlmodel import Field, SQLModel
from datetime import datetime
from pydantic import EmailStr
from typing import Optional
import uuid

class UserBase(SQLModel):
    id: uuid.UUID = Field(default_factory=uuid.uuid4, primary_key=True)
    username: str
    email: EmailStr
    password: str
    createdAt: datetime = Field(default_factory=datetime.now)
    profilePicture: Optional[str] = None
    pronouns: Optional[str] = None

class UserCreate(SQLModel):
    username: str
    email: EmailStr
    password: str = Field(min_length=8)
    
class UserUpdate(SQLModel):
    username: Optional[str] = None
    profilePicture: Optional[str] = None
    pronouns: Optional[str] = None

class UserLogin(SQLModel):
    email: EmailStr
    password: str