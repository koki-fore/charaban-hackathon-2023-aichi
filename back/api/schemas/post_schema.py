from pydantic import BaseModel
from datetime import datetime
from .user_schema import User
from .comment_schema import CommentWithUser
from typing import List

class PostCreate(BaseModel):
	before_picture_path: str
	after_picture_path: str
	before_text: str
	after_text: str

class PostUpdate():
	pass

class Post(PostCreate):
	id: int
	user_fk: int
	created_at: datetime
	updated_at: datetime
	is_deleted: bool
	users: User

class PostWithUser(Post):
	pass

class PostWithComment(Post):
	comments: List[CommentWithUser]