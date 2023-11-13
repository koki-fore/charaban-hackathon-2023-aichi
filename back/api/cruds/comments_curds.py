from sqlalchemy.orm import Session
from datetime import datetime
from models.db_models import Comment

# Create (作成)
def create_comment(db: Session, user_fk: int, post_fk: int, text: str):
    comment = Comment(
        user_fk=user_fk,
        post_fk=post_fk,
        text=text
    )
    db.add(comment)
    db.commit()
    db.refresh(comment)
    return comment

# Read (読み取り) - 特定のコメントを取得
def get_comment(db: Session, comment_id: int):
    return db.query(Comment).filter(Comment.id == comment_id).first()

# Read (読み取り) - 特定の投稿に紐づくコメントを取得
def get_comments_for_post(db: Session, post_fk: int):
    return db.query(Comment).filter(Comment.post_fk == post_fk).all()

# Update (更新)
def update_comment(db: Session, comment_id: int, new_text: str):
    comment = db.query(Comment).filter(Comment.id == comment_id).first()
    if comment:
        comment.text = new_text
        comment.updated_at = datetime.utcnow()
        db.commit()
        db.refresh(comment)
        return comment

# Delete (削除)
def delete_comment(db: Session, comment_id: int):
    comment = db.query(Comment).filter(Comment.id == comment_id).first()
    if comment:
        db
