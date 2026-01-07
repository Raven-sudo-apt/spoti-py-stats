from fastapi import APIRouter, UploadFile, File
from fastapi.responses import JSONResponse
from sqlmodel import Session
import boto3
import uuid
from pwdlib import PasswordHash
from db import engine
from models.Users import User
from schemas.users import UserCreate
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
    return JSONResponse(status_code=201, content={"message": "User created successfully with user ID", "user_id": str(user.id)})
    

@user_router.post("/login")
async def login_user(email: str, password: str):
    return {"message": "User logged in successfully"}


@user_router.get("/{user_id}")
async def get_user(user_id: str):
    return {"message": f"Get user with ID {user_id}"}

@user_router.put("/{user_id}")
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