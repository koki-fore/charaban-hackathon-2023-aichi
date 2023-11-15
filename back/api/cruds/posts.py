from sqlalchemy.orm import Session
from sqlalchemy.engine import Result
from sqlalchemy import select
from datetime import datetime
from typing import List

from models.db_models import Post as Post_model, Comment as Comment_model
from schemas.post_schema import PostCreate as PostCreate_schema
from schemas.post_schema import PostUpdate as PostUpdate_schema
from schemas.post_schema import Post as Post_schema
from schemas.post_schema import PostWithUser as PostWithUser_schema
from schemas.post_schema import PostWithComment as PostWithComment_schema


def create_post(
    post_create: PostCreate_schema,
    db: Session
    ) -> Post_model:
    post = Post_model(**post_create.model_dump())
    db.add(post)
    db.commit()
    db.refresh(post)
    return post

def get_all_posts(
    db: Session
    ) -> List[Post_schema]:
    return db.query(Post_model).all()

def get_post_with_comments(
    post_id: int,
    db: Session
    ) -> PostWithComment_schema:
    return db.query(Post_model).filter(Post_model.id == post_id).first()

def get_recommended_posts():
    pass

def update_post_is_delete(
    
    db: Session
    ):
    pass    
