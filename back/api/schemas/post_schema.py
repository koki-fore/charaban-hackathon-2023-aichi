from datetime import datetime
from typing import Tuple, List
from pydantic import BaseModel
from .user_schema import UserResponse


"""
	id = Column(Integer, primary_key=True, index=True)
	 user_fk = Column(Integer, ForeignKey("user.id", ondelete="CASCADE"), nullable=False)
	 before_picture_path = Column(String(400), nullable=False)
	 after_picture_path = Column(String(400), nullable=False)
	 before_text = Column(String(400), nullable=False)
	 after_text = Column(String(400), nullable=False)
	created_at = Column(DateTime, default=datetime.now(), nullable=False)
	updated_at = Column(DateTime, default=datetime.now(), onupdate=datetime.now(), nullable=False)
	is_deleted = Column(Boolean, default=False, nullable=False)
"""


class PostCreate(BaseModel):
    user_fk: int
    before_picture_path: str
    after_picture_path: str
    before_text: str
    after_text: str

class PostUpdate(PostCreate):
    pass

class PostResponse(PostCreate):
    id: int
    created_at: datetime
    updated_at: datetime
    is_deleted: bool
    
class PostWithUserResponse(PostResponse):
    user: UserResponse