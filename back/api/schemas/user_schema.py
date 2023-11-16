from pydantic import BaseModel
from datetime import datetime

class UserCreate(BaseModel):
	firebase_id: str
	screen_name: str
	description: str
	profile_picture_path: str

class UserUpdate(BaseModel):
	screen_name: str
	description: str
	profile_picture_path: str
  
class User(UserCreate):
	id: int
	created_at: datetime
	updated_at: datetime
	is_deleted: bool