from fastapi import Cookie
import os
import jwt

def get_user(access_token = Cookie(None)):
    jwt_key = os.getenv("JWT_SECRET")
    payload = jwt.decode(access_token, jwt_key, "HS256")

    return payload["sub"]