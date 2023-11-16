from sqlalchemy.orm import Session
# from sqlalchemy.engine import Result
# from sqlalchemy import select
# from datetime import datetime
from typing import List

import models.db_models as db_models
import schemas.post_schema as posts_schema
#from models.db_models import Post as Post_model, Comment as Comment_model
#from schemas.post_schema import PostCreate as PostCreate_schema
#from schemas.post_schema import PostUpdate as PostUpdate_schema
#from schemas.post_schema import Post as Post_schema
#from schemas.post_schema import PostWithUser as PostWithUser_schema
#from schemas.post_schema import PostWithComment as PostWithComment_schema


def create_post(
    db: Session,
    post_create: posts_schema.PostCreate
    ) -> db_models.Post:
    post = db_models.Post(**post_create.model_dump())
    db.add(post)
    db.commit()
    db.refresh(post)
    return post

def get_all_posts(
    db: Session
    ) -> List[posts_schema.Post]:
    return db.query(db_models.Post).all()

def get_post(
    db: Session,
    post_id: int
    ) -> posts_schema.Post:
    return db.query(db_models.Post).filter(db_models.Post.id == post_id).first()

def get_post_with_comments(
    db: Session,
    post_id: int
    ) -> posts_schema.PostWithComment:
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