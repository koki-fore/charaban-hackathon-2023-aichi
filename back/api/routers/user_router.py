from fastapi import APIRouter, Depends
from typing import List
from sqlalchemy.orm import Session
from db_sync_session import db_session
from cruds.user_curds import *
from schemas.user_schema import *

router = APIRouter()

@router.post("/users", response_model = UserResponse)
def user_create(user: UserCreate, db: Session = Depends(db_session)):
    user = create_user(user.model_dump(), db)
    return user

@router.get("/users", response_model = List[UserResponse])
def get_users_all(db: Session = Depends(db_session)):
    users = get_users(db)
    return users