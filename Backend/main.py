from fastapi import FastAPI
from Routes.usersRoute import user_router
from Routes.tracksRoute import track_router
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import SQLModel
from db import engine
load_dotenv()

app = FastAPI()


SQLModel.metadata.create_all(engine)

origins = [
    "http://localhost:5173",
    "http://127.0.0.1:5173",
    "https://localhost:5173",
    "https://127.0.0.1:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"],
)
app.include_router(user_router, prefix="/user", tags=["users"])
app.include_router(track_router, prefix="/track", tags=["tracks"])