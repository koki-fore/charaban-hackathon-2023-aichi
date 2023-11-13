from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List
from db_sync_session import db_session
from cruds.post_cruds import create_post, get_post, comments_widh_users
from schemas.post_schema import *

router = APIRouter()

@router.post("/posts", response_model = PostResponse)
def post_create(post: PostCreate, db: Session=Depends(db_session)):
    post = create_post(post.model_dump(), db)
    return post

@router.get("/posts")
def get_posts_with_users(db: Session = Depends(db_session)):
    posts = comments_widh_users(db)
    # posts: list[<class 'sqlalchemy.engine.row.Row'>]
    print(f"------------------------")
    print(type(posts[0]))
    print(f"------------------------")
    post_with_user = []
    for po, us in posts:
        po.__dict__["user"] = us.__dict__
        post_with_user.append(po)
    return post_with_user
