from fastapi import FastAPI
import Routes
from Routes.usersRoute import user_router
from Routes.artistsRoute import artist_router
from Routes.albumsRoute import album_router
from Routes.tracksRoute import track_router
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware
load_dotenv()

app = FastAPI()
app.include_router(user_router, prefix="/users", tags=["users"])
app.include_router(artist_router, prefix="/artists", tags=["artists"])
app.include_router(album_router, prefix="/albums", tags=["albums"])
app.include_router(track_router, prefix="/tracks", tags=["tracks"])





# origins = [
#     "http://localhost:5173/*",
#     "http://127.0.0.1:5173/*",
# ]
    

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=origins,        
#     allow_credentials=True,        
#     allow_methods=["*"],           
#     allow_headers=["*"],          
# )

