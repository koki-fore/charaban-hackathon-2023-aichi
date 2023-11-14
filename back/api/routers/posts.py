from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

import cruds.posts as posts_cruds
import schemas.post_schema as posts_schemas
from db_sync_session import db_session

router = APIRouter()

@router.get("/posts", response_model=List[posts_schemas.Post])
def list_posts(
    db: Session = Depends(db_session)
):
    return posts_cruds.get_all_posts(db)

@router.post("/posts", response_model=posts_schemas.PostCreate)
def create_post(
    post_body: posts_schemas.PostCreate,
    db: Session = Depends(db_session)
):
    return posts_cruds.create_post(db, post_body)

@router.get("/posts/{post_id}/comments", response_model=List[posts_schemas.PostWithComment])
def list_post_with_comments(post_id: int, db: Session = Depends(db_session)):
    return posts_cruds.get_post_with_comments(db, post_id)

@router.get("/posts/recommended")
def list_recommended_post():
    pass

@router.put("/posts/{posts_id}/delete")
def update_post_delete_at():
    pass
