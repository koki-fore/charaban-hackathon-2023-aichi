from sqlalchemy.orm import Session
from typing import List

import models.db_models as db_models
import schemas.like_schema as likes_schema

def create_like(
    db: Session,
    post_id: int,
    user_id: int
    ) -> db_models.Like:
    like = db_models.Like(
        post_fk=post_id,
        user_fk=user_id
    )
    if db.query(db_models.Like).filter(db_models.Like.post_fk == post_id).filter(db_models.Like.user_fk == user_id).first():
        return "Like already exists"
    db.add(like)
    db.commit()
    db.refresh(like)
    return like

def get_all_likes(
    db: Session
    ) -> List[db_models.Like]:
    return db.query(db_models.Like).all()
    

def delete_like(
    db: Session,
    post_id: int,
    user_id: int
    ) -> db_models.Like:
    like = db.query(db_models.Like).filter(db_models.Like.user_fk == user_id, db_models.Like.post_fk == post_id).first()
    db.delete(like)
    db.commit()
    return like

def get_likes_count(
    db: Session,
    post_id: int
    ) -> int:
    return db.query(db_models.Like).filter(db_models.Like.post_fk == post_id).count()