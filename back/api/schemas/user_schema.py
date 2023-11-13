from datetime import datetime
from pydantic import BaseModel


"""
	id = Column(Integer, primary_key=True, index=True)
	 screen_name = Column(String(30), nullable=False)
	 description = Column(String(400), nullable=False)
	 profile_picture_path = Column(String(400), nullable=False)
	created_at = Column(DateTime, default=datetime.now(), nullable=False)
	updated_at = Column(DateTime, default=datetime.now(), onupdate=datetime.now(), nullable=False)
	is_deleted = Column(Boolean, default=False, nullable=False)
"""

class UserCreate(BaseModel):
    screen_name: str
    description: str
    profile_picture_path: str

class UserUpdate(UserCreate):
    pass

class UserResponse(UserCreate):
    id: int
    created_at: datetime
    updated_at: datetime
    is_deleted: bool