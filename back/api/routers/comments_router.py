from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from db_sync_session import db_session
from cruds.comments_curds import create_user, get_users

router = APIRouter()

@router.post("/posts")
def post_create(db: Session = Depends(db_session)):
    user = create_user(user_id, screen_name, description, profile_picture_path, db)
    return user

@router.get("/posts")
def get_posts_all(db: Session = Depends(db_session)):
    users = get_users(db)
    return users