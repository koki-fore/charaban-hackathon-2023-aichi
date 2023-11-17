from pydantic import BaseModel
from datetime import datetime

class LikeCreate(BaseModel):
	post_fk: int

class LikeUpdate():
	pass

class Like(LikeCreate):
	id: int
	user_fk: int
	created_at: datetime
	updated_at: datetime