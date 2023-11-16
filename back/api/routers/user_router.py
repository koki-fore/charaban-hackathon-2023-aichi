from fastapi import APIRouter, Depends
from typing import List
from sqlalchemy.orm import Session
from db_sync_session import db_session
from cruds.user_crud import *
from schemas.user_schema import User, UserCreate, UserUpdate
from utils.auth import auth_user

router = APIRouter()

@router.post("/users", response_model = User)
def user_create(create_data: UserCreate, db: Session = Depends(db_session)):
    user = create_user(create_data.model_dump(), db)
    return user

@router.get("/users", response_model = List[User])
def get_users_all(db: Session = Depends(db_session)):
    users = get_users(db)
    return users

@router.get("/users/{id}", response_model=User)
def get_user_by_id(id: int, db: Session = Depends(db_session)):
    user = get_user_by_primary(db, id)
    return user

@router.put("/users/{id}/delete", response_model=User)
def delete_user_by_id(id: int, db: Session = Depends(db_session)):
    user = get_user_by_primary(db, id)
    _ = delete_user(db, user)
    return

@router.get("/users/me", response_model=User)
def get_me(db: Session = Depends(db_session)):
    user = auth_user(db)
    return user

@router.put("/users/me", response_model=User)
def update_me(update_data: UserUpdate, db: Session=Depends(db_session)):
    user = auth_user(db)
    updated_user = update_user(db, update_data, user)
    return updated_user