from sqlalchemy.orm import Session
from models.db_models import User

def create_user(create_data, db):
    user = User(**create_data)
    db.add(user)
    db.commit()
    db.refresh(user)
    return user

def get_users(db):
    return db.query(User).filter(User.is_deleted == False).all()

def get_user_by_primary(db, id):
    return db.query(User).filter(User.id == id, User.is_deleted == False).first()

def get_user_by_firebase(db, firebase_id):
    return db.query(User).filter(User.firebase_id == firebase_id, User.is_deleted == False).first()

def update_user(db, update_data, user):
    user.firebase_id = update_data.firebase_id
    user.screen_name = update_data.screen_name
    user.description = update_data.description
    user.profile_picture_path = update_data.profile_picture_path
    db.commit()
    db.refresh(user)
    return user

def delete_user(db: Session, user: User):
    user.is_deleted = True
    db.commit()
    db.refresh(user)
    return user