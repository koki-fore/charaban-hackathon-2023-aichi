from sqlalchemy.orm import Session
from typing import List

import models.db_models as db_models
import schemas.like_schema as likes_schema

def create_like(
    db: Session,
    like_create: likes_schema.LikeCreate
    ) -> db_models.Like:
    like = db_models.Like(**like_create)
    if db.query(db_models.Like).filter(db_models.Like.post_fk == like_create.post_fk).filter(db_models.Like.user_fk == like_create.user_fk).first():
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
    like_id: int
    ) -> db_models.Like:
    like = db.query(db_models.Like).filter(db_models.Like.id == like_id).first()
    db.delete(like)
    db.commit()
    return like

def get_likes_count(
    db: Session,
    post_id: int
    ) -> int:
    return db.query(db_models.Like).filter(db_models.Like.post_fk == post_id).count()