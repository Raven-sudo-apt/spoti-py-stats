import boto3
from fastapi import APIRouter, UploadFile, File
import uuid
track_router = APIRouter()

@track_router.post("/upload/")
async def upload_track(track_file: UploadFile = File()):
    S3client = boto3.client("s3")
    splitted_filename = track_file.filename.split(".")
    file_extension = splitted_filename[-1]
    new_filename = f"public/tracks/{str(uuid.uuid4())}.{file_extension}"
    S3client.upload_fileobj(track_file.file, "spotipy-files", new_filename, ExtraArgs={"ContentType": file_extension})


@track_router.get("/")
async def list_tracks():
    S3client = boto3.client("s3")
    response = S3client.list_objects_v2(Bucket="spotipy-files", Prefix="public/tracks/")
    track_files = [item['Key'] for item in response.get('Contents', [])]
    return {"tracks": track_files}

@track_router.get("/{track_id}")
async def get_track(track_id: str):
    return {"message": f"Get track with ID {track_id}"}

@track_router.put("/{track_id}")
async def update_track(track_id: str):
    return {"message": f"Update track with ID {track_id}"}

@track_router.delete("/{track_id}")
async def delete_track(track_id: str):
    return {"message": f"Delete track with ID {track_id}"}

@track_router.get("/stream/{track_id}")
async def stream_track(track_id: str):
    return {"message": f"Stream track with ID {track_id}"}