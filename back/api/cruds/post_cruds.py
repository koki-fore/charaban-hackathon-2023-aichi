from sqlalchemy.orm import Session, joinedload
from datetime import datetime
from models.db_models import User, Post

# Create (作成)
def create_post(post, db):
    post = Post(**post)
    db.add(post)
    db.commit()
    db.refresh(post)
    return post

# Read (読み取り) - 特定の投稿を取得
def get_post(db: Session, post_id: int):
    return db.query(Post).filter(Post.id == post_id).first()

# Read (読み取り) - 特定のユーザーに関連する全ての投稿を取得
def get_posts_for_user(db: Session, user_fk: int):
    # return db.query(Post).filter(Post.user_fk == user_fk).all()
    return db.query(Post).options(joinedload(Post.user))

# Comments とそれに紐づく User を取得
def comments_widh_users(db: Session):
    return db.query(Post, User).join(User, Post.user_fk == User.id).all()

# Update (更新)
def update_post(db: Session, post_id: int, new_before_text: str, new_after_text: str):
    post = db.query(Post).filter(Post.id == post_id).first()
    if post:
        post.before_text = new_before_text
        post.after_text = new_after_text
        post.updated_at = datetime.utcnow()
        db.commit()
        db.refresh(post)
        return post

# Delete (削除)
def delete_post(db: Session, post_id: int):
    post = db.query(Post).filter(Post.id == post_id).first()
    if post:
        db.delete(post)
        db.commit()
        return post
