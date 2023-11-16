from fastapi import APIRouter, Depends, HTTPException
# from .auth import auth_user
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
    posts = posts_cruds.get_all_posts(db)
    # if posts is None:
    #     raise HTTPException(status_code=404, detail="Posts not found")
    return posts

@router.post("/posts", response_model=posts_schemas.PostCreate)
def create_post(
    post_body: posts_schemas.PostCreate,
    # uid: int = Depends(auth_user),
    db: Session = Depends(db_session)
    ):
    return posts_cruds.create_post(db, post_body)

@router.get("/posts/{post_id}/comments", response_model=posts_schemas.PostWithComment)
def get_post_with_comments(
    post_id: int, 
    db: Session = Depends(db_session)
    ):
    post = posts_cruds.get_post(db, post_id)
    if post is None:
        raise HTTPException(status_code=404, detail="Post not found")
    return post

@router.get("/posts/recommended")
def list_recommended_post():
    if list_recommended_post is None:
        raise HTTPException(status_code=404, detail="Posts not found")
    pass

@router.put("/posts/{posts_id}/delete", response_model=posts_schemas.Post)
def update_post_is_delete(
    post_id: int,
    # uid: int = Depends(auth_user),
    db: Session = Depends(db_session)
    ):
    post = posts_cruds.get_post(db, post_id)
    if post is None:
        raise HTTPException(status_code=404, detail="Post not found")
    return posts_cruds.update_post_is_delete(db, post)

@router.delete("/posts/{post_id}")
def delete_post(
    post_id: int,
    # uid: int = Depends(auth_user),
    db: Session = Depends(db_session)
    ):
    post = posts_cruds.get_post(db, post_id)
    if post is None:
        raise HTTPException(status_code=404, detail="Post not found")
    return posts_cruds.delete_post(db, post_id)

# @router.post("/test")
# def test(uid: int = Depends(auth_user)):
#     return uid