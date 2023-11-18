from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from utils.auth import auth_user

import cruds.likes as likes_cruds
import schemas.like_schema as likes_schema
from db_sync_session import db_session

router = APIRouter()

@router.post("/likes", response_model=likes_schema.Like)
def create_like(
    like: likes_schema.LikeCreate,
    db: Session = Depends(db_session),
    user = Depends(auth_user)
    ):
    like = likes_cruds.create_like(db, post_id=like.post_fk, user_id=user.id)
    if like == "Like already exists":
        raise HTTPException(status_code=400, detail="Like already exists")
    return like

@router.get("/likes", response_model=List[likes_schema.Like])
def list_likes(
    db: Session = Depends(db_session)
    ) -> List[likes_schema.Like]:
    return likes_cruds.get_all_likes(db)

@router.delete("/likes")
def delete_like(
    like: likes_schema.LikeCreate,
    user = Depends(auth_user),
    db: Session = Depends(db_session)
    ) -> likes_schema.Like:
    return likes_cruds.delete_like(db, post_id=like.post_fk, user_id=user.id)

@router.get("/likes-count/{post_id}")
def get_likes_count(
    post_id: int,
    db: Session = Depends(db_session)
    ) -> int:
    return likes_cruds.get_likes_count(db, post_id)