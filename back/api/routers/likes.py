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
    like_body: likes_schema.LikeCreate,
    db: Session = Depends(db_session),
    user = Depends(auth_user)
    ):
    like_body = like_body.model_dump()
    like_body["user_fk"] = user.id
    like = likes_cruds.create_like(db, like_body)
    if like == "Like already exists":
        raise HTTPException(status_code=400, detail="Like already exists")
    return like

@router.get("/likes", response_model=List[likes_schema.Like])
def list_likes(
    db: Session = Depends(db_session)
    ) -> List[likes_schema.Like]:
    return likes_cruds.get_all_likes(db)

@router.delete("/likes/{like_id}")
def delete_like(
    like_id: int,
    db: Session = Depends(db_session)
    ) -> likes_schema.Like:
    return likes_cruds.delete_like(db, like_id)

@router.get("/likes-count/{post_id}")
def get_likes_count(
    post_id: int,
    db: Session = Depends(db_session)
    ) -> int:
    return likes_cruds.get_likes_count(db, post_id)