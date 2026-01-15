from datetime import datetime, timedelta, timezone
import os
import jwt as jwt_lib
from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import JSONResponse
from sqlmodel import Session, select
from pwdlib import PasswordHash

from db import engine
from models.Users import User
from schemas.users import UserCreate, UserLogin
from Routes.auth_helper import get_user

user_router = APIRouter()

hashedPassword = PasswordHash.recommended()

@user_router.post("/signup")
async def signup_user(user_req: UserCreate):
    try:
        with Session(engine) as session:
            user_req_dict = user_req.model_dump(exclude_none=True)  
            hashed_password = hashedPassword.hash(user_req_dict["password"])
            del user_req_dict["password"]
            user = User(**user_req_dict, password_hash=hashed_password)
            session.add(user)
            session.commit()
            session.refresh(user)
    except Exception as err:
        return JSONResponse(status_code=400, content={"message": "Error creating user", "error": str(err)})
    return JSONResponse(status_code=201, content={"message": "Sign up successful, redirecting to login page..."})
    

@user_router.post("/login")
def login_user(login_req: UserLogin):
    secret_key = os.getenv("JWT_SECRET", "change-me")
    expire = datetime.now(timezone.utc) + timedelta(days=30)
    req_dict = login_req.model_dump()

    with Session(engine) as session:
        statement = select(User).where(User.email == req_dict["email"])
        user = session.exec(statement).first()

        if not user or not hashedPassword.verify(req_dict["password"], user.password_hash):
            return JSONResponse(status_code=401, content={"message": "Invalid email or password"})

        payload = {"sub": str(user.id), "exp": expire}
        token = jwt_lib.encode(payload, secret_key, algorithm="HS256")

        response = JSONResponse(
            status_code=200,
            content={
                "message": "Login successful",
                "user": {
                    "id": str(user.id),
                    "username": user.username,
                    "email": user.email,
                    "profile_picture": user.profile_picture,
                },
            }
        )
        response.set_cookie(
            key="jwt",
            value=token,
            httponly=False,
            samesite="lax",
            max_age=None,
            path="/",
            domain=None,
            partitioned=False,
            expires=expire
        )
        return response
         
@user_router.get("/me")
async def get_current_user(current_user: User = Depends(get_user)):
    user_dict = current_user.model_dump()
    user_dict.pop("password_hash", None)
    return user_dict
        
@user_router.get("/{user_id}")
async def get_user_by_id(user_id: str):
    with Session(engine) as session:
        statement = select(User).where(User.id == user_id)
        user = session.exec(statement).first()
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        user_dict = user.model_dump()
        del user_dict["password_hash"]
        del user_dict["email"]
        del user_dict["share_activity"]
        del user_dict["share_local_metadata"]
        return user_dict

@user_router.put("/me")
async def update_user(user_id: str):
    return {"message": f"Update user with ID {user_id}"}

@user_router.delete("/{user_id}")
async def delete_user(user_id: str):
    return {"message": f"Delete user with ID {user_id}"}

@user_router.get("/{user_id}/friends")
async def get_user_friends(user_id: str):
    return {"message": f"Get friends for user with ID {user_id}"}
@user_router.post("/{user_id}/friends/{friend_id}")
async def add_user_friend(user_id: str, friend_id: str):
    return {"message": f"Add friend with ID {friend_id} for user with ID {user_id}"}

@user_router.delete("/{user_id}/friends/{friend_id}")
async def remove_user_friend(user_id: str, friend_id: str):
    return {"message": f"Remove friend with ID {friend_id} for user with ID {user_id}"}