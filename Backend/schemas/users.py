from sqlmodel import Field, SQLModel
from datetime import datetime
from pydantic import EmailStr
from typing import Optional
import uuid

class UserCreate(SQLModel):
    username: str
    email: EmailStr
    password: str = Field(min_length=8)
    
class UserUpdate(SQLModel):
    email: Optional[EmailStr] = None
    username: Optional[str] = None
    profile_picture: Optional[str] = None

class UserLogin(SQLModel):
    email: EmailStr
    password: str