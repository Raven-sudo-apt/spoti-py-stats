import boto3
from fastapi import APIRouter, UploadFile, File
import uuid
playlist_router = APIRouter()

@playlist_router.post("/upload/")
async def upload_playlist(playlist_file: UploadFile = File()):
    S3client = boto3.client("s3")
    splitted_filename = playlist_file.filename.split(".")
    file_extension = splitted_filename[-1]
    new_filename = f"public/playlists/{str(uuid.uuid4())}.{file_extension}"
    S3client.upload_fileobj(playlist_file.file, "spotipy-files", new_filename, ExtraArgs={"ContentType": file_extension})

@playlist_router.get("/")
async def list_playlists():
    S3client = boto3.client("s3")
    response = S3client.list_objects_v2(Bucket="spotipy-files", Prefix="public/playlists/")
    playlist_files = [item['Key'] for item in response.get('Contents', [])]
    return {"playlists": playlist_files}