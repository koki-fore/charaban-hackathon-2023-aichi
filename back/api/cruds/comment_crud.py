from sqlalchemy.orm import Session
from models.db_models import Comment

def create_comment(create_data, db):
    comment = Comment(**create_data)
    db.add(comment)
    db.commit()
    db.refresh(comment)
    return comment

def get_comment_by_primary(db, id):
    return db.query(Comment).filter(Comment.id == id).first()

def delete_comment(db: Session, comment: Comment):
        db.delete(comment)
        db.commit()