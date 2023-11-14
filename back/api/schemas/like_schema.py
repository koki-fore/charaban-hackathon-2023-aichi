from pydantic import BaseModel
from datetime import datetime

class LikeCreate(BaseModel):
	user_fk: int
	post_fk: int

class LikeUpdate():
	pass

class Like(LikeCreate):
	id: int
	created_at: datetime
	updated_at: datetime