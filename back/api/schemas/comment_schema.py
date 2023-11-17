from pydantic import BaseModel
from datetime import datetime
from .user_schema import User
from typing import List

class CommentCreate(BaseModel):
	post_fk: int
	text: str
	screen_name: str
	profile_picture_path: str

class CommentUpdate():
	pass

class Comment(CommentCreate):
	id: int
	user_fk: int
	created_at: datetime
	updated_at: datetime

class CommentWithUser(Comment):
	users: User
 