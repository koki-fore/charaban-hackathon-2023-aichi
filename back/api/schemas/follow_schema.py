from pydantic import BaseModel
from datetime import datetime
from .user_schema import User

class FollowCreate(BaseModel):
	from_user_fk: int
	to_user_fk: int

class FollowUpdate(FollowCreate):
	pass

class Follow(FollowCreate):
	id: int
	created_at: datetime
	updated_at: datetime

class FollowtWithUser(Follow):
	user: User