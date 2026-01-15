from fastapi import APIRouter, UploadFile, File, Depends
from sqlmodel import Session, select
import uuid
from db import engine, get_db
from models.Tracks import Track
from models.Users import User
from Routes.auth_helper import s3_client, get_presigned_url, get_user


track_router = APIRouter()

    
@track_router.post("/upload/")
async def upload_track(track_file: UploadFile = File(), db: Session = Depends(get_db), uploader: User = Depends(get_user)):
    
    
    splitted_filename = track_file.filename.split(".")
    file_extension = splitted_filename[-1]
    new_filename = f"public/tracks/{str(uuid.uuid4())}.{file_extension}"
    s3_client.upload_fileobj(track_file.file, "spotipy-files", new_filename, ExtraArgs={"ContentType": file_extension})
    
    track = Track(
        filename=new_filename,
        title=splitted_filename[0],
        owner_id=uploader.id
    )
    db.add(track)
    db.commit()
    db.refresh(track)
    return {"message": "Track uploaded successfully", "track_id": str(track.id)}

@track_router.get("/")
async def list_tracks(db: Session = Depends(get_db)):
    tracks = db.exec(select(Track)).all()
    return {"tracks": [{"id": str(t.id), "title": t.title, "artist_name": t.artist_name, "filename": t.filename, "url": get_presigned_url(t.filename), "owner_id": str(t.owner_id)} for t in tracks]}

@track_router.get("/my-tracks/")
async def get_my_tracks(db: Session = Depends(get_db), user: User = Depends(get_user)):
    tracks = db.exec(select(Track).where(Track.owner_id == user.id)).all()
    return {
        "tracks": [
            {
                "id": str(t.id),
                "title": t.title if hasattr(t, 'title') else "Unknown",
                "artist_name": t.artist_name if hasattr(t, 'artist_name') else "",
                "filename": t.filename,
                "url": get_presigned_url(t.filename),
                "created_at": str(t.created_at),
            }
            for t in tracks
        ]
    }

# @track_router.put("/{track_id}")
# async def update_track(track_id: str):
#     return {"message": f"Update track with ID {track_id}"}

# @track_router.delete("/{track_id}")
# async def delete_track(track_id: str):
#     return {"message": f"Delete track with ID {track_id}"}

# @track_router.get("/stream/{track_id}")
# async def stream_track(track_id: str):
#     return {"message": f"Stream track with ID {track_id}"}