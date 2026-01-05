from fastapi import APIRouter

user_router = APIRouter()
artist_router = APIRouter()

@user_router.get("/users/")
async def get_users():
    return {"message": "List of users"}

@artist_router.get("/artists/")
async def get_artists():
    return {"message": "List of artists"}