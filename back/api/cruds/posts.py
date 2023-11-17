from sqlalchemy.orm import Session
from typing import List

import models.db_models as db_models
import schemas.post_schema as posts_schema


def create_post(
    db: Session,
    post_create: posts_schema.PostCreate,
    user_id: int,
    ) -> db_models.Post:
    post = db_models.Post(**post_create.model_dump())
    post.user_fk = user_id
    db.add(post)
    db.commit()
    db.refresh(post)
    return post

def get_all_posts(
    db: Session
    ) -> List[posts_schema.Post]:
    return db.query(db_models.Post).filter(db_models.Post.is_deleted == False).order_by(db_models.Post.created_at.desc()).all()

def get_post(
    db: Session,
    post_id: int
    ) -> posts_schema.Post:
    return db.query(db_models.Post).filter(db_models.Post.id == post_id).first()

def get_post_with_comments(
    db: Session,
    post_id: int
    ):
    return db.query(db_models.Post).filter(db_models.Post.id == post_id).first()

def get_recommended_posts():
    pass

def update_post_is_delete(
    db: Session,
    original: posts_schema.Post
    ) -> db_models.Post:
    original.is_deleted = True
    db.add(original)
    db.commit()
    db.refresh(original)
    return original

def delete_post(
    db: Session,
    post_id: int
    ) -> db_models.Post:
    post = db.query(db_models.Post).filter(db_models.Post.id == post_id).first()
    db.delete(post)
    db.commit()
    return