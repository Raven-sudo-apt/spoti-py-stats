from fastapi import APIRouter, UploadFile, File
import boto3
import uuid
user_router = APIRouter()
artist_router = APIRouter()
album_router = APIRouter()
track_router = APIRouter()

@user_router.get("/")
async def get_users():
    return {"message": "List of users"}

@album_router.get("/")
async def get_albums():
    return {"message": "List of albums"}

@track_router.get("/")
async def get_tracks():
    return {"message": "List of tracks"}    

@artist_router.post("/upload/")
async def upload_artist(artist_file: UploadFile = File()):
    S3client = boto3.client("s3")
    splitted_filename = artist_file.filename.split(".")
    file_extension = splitted_filename[-1]
    new_filename = f"public/artists/{str(uuid.uuid4())}.{file_extension}"
    S3client.upload_fileobj(artist_file.file, "spotipy-files", new_filename, ExtraArgs={"ContentType": file_extension})

@album_router.post("/upload/")
async def upload_album(album_file: UploadFile = File()):
    S3client = boto3.client("s3")
    splitted_filename = album_file.filename.split(".")
    file_extension = splitted_filename[-1]
    new_filename = f"public/albums/{str(uuid.uuid4())}.{file_extension}"
    S3client.upload_fileobj(album_file.file, "spotipy-files", new_filename, ExtraArgs={"ContentType": file_extension})

@track_router.post("/upload/")
async def upload_track(track_file: UploadFile = File()):
    S3client = boto3.client("s3")
    splitted_filename = track_file.filename.split(".")
    file_extension = splitted_filename[-1]
    new_filename = f"public/tracks/{str(uuid.uuid4())}.{file_extension}"
    S3client.upload_fileobj(track_file.file, "spotipy-files", new_filename, ExtraArgs={"ContentType": file_extension})

@artist_router.get("/")
async def list_artists():
    S3client = boto3.client("s3")
    response = S3client.list_objects_v2(Bucket="spotipy-files", Prefix="public/artists/")
    artist_files = [item['Key'] for item in response.get('Contents', [])]
    return {"artists": artist_files}