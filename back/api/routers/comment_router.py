from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from db_sync_session import db_session
from cruds.comment_crud import *
from schemas.comment_schema import CommentCreate, Comment
from utils.auth import auth_user

router = APIRouter()

@router.post("/comments", response_model = Comment)
def comment_create(create_data: CommentCreate, user = Depends(auth_user), db: Session = Depends(db_session)):
    create_data = create_data.model_dump()
    create_data["user_fk"] = user.id
    comment = create_comment(create_data, db)
    return comment

@router.put("/comments/{id}", response_model=Comment)
def delete_comment(id: int, db: Session = Depends(db_session)):
    comment = get_comment_by_primary(db, id)
    if comment:
        delete_comment(db, comment)
    return