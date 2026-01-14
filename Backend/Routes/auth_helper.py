import os
import jwt
import boto3
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlmodel import Session, select
from db import get_db
from models.Users import User

s3_client = boto3.client("s3",
                             region_name=os.getenv('AWS_DEFAULT_REGION', 'eu-north-1'),
                            aws_access_key_id=os.getenv('AWS_ACCESS_KEY_ID'),
                            aws_secret_access_key=os.getenv('AWS_SECRET_ACCESS_KEY'))

security = HTTPBearer(auto_error=True)

def get_presigned_url(filename: str, expiration: int = 3600) -> str:
    bucket_name = 'spotipy-files'

    url= s3_client.generate_presigned_url(
        'get_object',
        Params={'Bucket': bucket_name, 'Key': filename},
        ExpiresIn=expiration
    )
    return url

def get_user(credentials: HTTPAuthorizationCredentials = Depends(security), db: Session = Depends(get_db)) -> User:
    token = credentials.credentials
    jwt_key = os.getenv("JWT_SECRET", "change-me")
    s3_client = boto3.client("s3",
                             region_name=os.getenv('AWS_DEFAULT_REGION', 'us-east-1'),
                            aws_access_key_id=os.getenv('AWS_ACCESS_KEY_ID'),
                            aws_secret_access_key=os.getenv('AWS_SECRET_ACCESS_KEY'))

    try:
        payload = jwt.decode(token, jwt_key, algorithms=["HS256"])
    except jwt.InvalidTokenError as exc: 
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token") from exc

    user_id = payload.get("sub")
    if not user_id:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token payload")

    user = db.exec(select(User).where(User.id == user_id)).first()
    if not user:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User not found")

    return user