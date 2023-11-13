from sqlalchemy.orm import Session
from datetime import datetime
from models.db_models import User
from schemas.user_schema import *

# Create (作成)
def create_user(user, db):
    user = User(**user)
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

# Read (読み取り) - 全てのユーザーを取得
def get_users(db: Session):
    return db.query(User).all()

# Read (読み取り) - 特定のユーザーを取得
def get_user(db: Session, user_id: int):
    return db.query(User).filter(User.user_id == user_id).first()

# Update (更新)
def update_user(db: Session, user_id: int, new_screen_name: str, new_description: str, new_profile_picture_path: str):
    user = db.query(User).filter(User.user_id == user_id).first()
    if user:
        user.screen_name = new_screen_name
        user.description = new_description
        user.profile_picture_path = new_profile_picture_path
        user.updated_at = datetime.utcnow()
        db.commit()
        db.refresh(user)
        return user

# Delete (削除)
def delete_user(db: Session, user_id: int):
    user = db.query(User).filter(User.user_id == user_id).first()
    if user:
        db.delete(user)
        db.commit()
        return user
