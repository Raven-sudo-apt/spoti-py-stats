from fastapi import APIRouter, UploadFile, File
import boto3
import uuid
album_router = APIRouter()


@album_router.post("/upload/")
async def upload_album(album_file: UploadFile = File()):
    S3client = boto3.client("s3")
    splitted_filename = album_file.filename.split(".")
    file_extension = splitted_filename[-1]
    new_filename = f"public/albums/{str(uuid.uuid4())}.{file_extension}"
    S3client.upload_fileobj(album_file.file, "spotipy-files", new_filename, ExtraArgs={"ContentType": file_extension})


@album_router.get("/")
async def list_albums():
    S3client = boto3.client("s3")
    response = S3client.list_objects_v2(Bucket="spotipy-files", Prefix="public/albums/")
    album_files = [item['Key'] for item in response.get('Contents', [])]
    return {"albums": album_files}

