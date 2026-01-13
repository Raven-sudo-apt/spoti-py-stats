from fastapi import APIRouter, Cookie, HTTPException, UploadFile, File
from fastapi.responses import JSONResponse, Response
from sqlmodel import Session, select
import boto3
import uuid
from pwdlib import PasswordHash
from db import engine
from models.Users import User
from schemas.users import UserCreate, UserLogin
from datetime import datetime, timedelta, timezone
import os
import jwt as jwt_lib
user_router = APIRouter()

hashedPassword = PasswordHash.recommended()

@user_router.post("/upload/")
async def upload_user(user_file: UploadFile = File()):
    S3client = boto3.client("s3")
    splitted_filename = user_file.filename.split(".")
    file_extension = splitted_filename[-1]
    new_filename = f"public/users/{str(uuid.uuid4())}.{file_extension}"
    S3client.upload_fileobj(user_file.file, "spotipy-files", new_filename, ExtraArgs={"ContentType": file_extension})

@user_router.get("/")
async def list_users():
    S3client = boto3.client("s3")
    response = S3client.list_objects_v2(Bucket="spotipy-files", Prefix="public/users/")
    user_files = [item['Key'] for item in response.get('Contents', [])]
    return {"users": user_files}

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
def login_user(login_req: UserLogin, response: Response):
    secret_key = os.getenv("JWT_SECRET")
    expire = datetime.now(timezone.utc) + timedelta(days=30)
    req_dict = login_req.model_dump()
    with Session(engine) as session:
        statement = select(User).where(User.email == req_dict["email"])
        user = session.exec(statement).first()
        if not user or not hashedPassword.verify(req_dict["password"], user.password_hash):
            return JSONResponse(status_code=401, content={"message": "Invalid email or password"})
        def create_jwt(user):
            payload = {"sub": str(user.id), "exp": expire}
            jwt_token = jwt_lib.encode(payload, secret_key, "HS256")
            return jwt_token
        token = create_jwt(user)
        response.set_cookie(key="jwt", value=token, httponly=False, max_age=None, secure=False, 
                            samesite="lax", path="/", domain=None, partitioned=False, expires=expire)
        print (user.id)
        return {"message": "Login successful, redirecting..."}
         
@user_router.get("/me")
async def get_current_user(jwt: str = Cookie(...)):
    secret_key = os.getenv("JWT_SECRET")
    try:
        payload = jwt_lib.decode(jwt, secret_key, "HS256")
        user_id = payload.get("sub")
        with Session(engine) as session:
            statement = select(User).where(User.id == (user_id))
            user = session.exec(statement).first()
            user_dict = user.model_dump()
            del user_dict["password_hash"]
            return user_dict
    except Exception as err:
        raise HTTPException(status_code=401, detail=str(err)) 
        
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