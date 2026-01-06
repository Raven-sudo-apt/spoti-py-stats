from fastapi import FastAPI
from routers import user_router, artist_router, album_router, track_router
from dotenv import load_dotenv
load_dotenv()

app = FastAPI()
app.include_router(user_router, prefix="/users", tags=["users"])
app.include_router(artist_router, prefix="/artists", tags=["artists"])
app.include_router(album_router, prefix="/albums", tags=["albums"])
app.include_router(track_router, prefix="/tracks", tags=["tracks"])