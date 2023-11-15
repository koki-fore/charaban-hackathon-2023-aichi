from sqlalchemy import Column, Integer, String, DateTime, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from db_sync_session import Base

class User(Base):
	__tablename__ = "users"

	id = Column(Integer, primary_key=True, index=True)
	firebase_id = Column(String(50), nullable=False)
	screen_name = Column(String(50), nullable=False)
	description = Column(String(500), nullable=False)
	profile_picture_path = Column(String(500), nullable=False)
	created_at = Column(DateTime, server_default=func.now(), nullable=False)
	updated_at = Column(DateTime, server_default=func.now(), server_onupdate=func.now(), nullable=False)
	is_deleted = Column(Boolean, default=False, nullable=False)

	comments = relationship("Comment", backref="users")
	posts = relationship("Post", backref="users")
	likes = relationship("Like", backref="users")
	follows = relationship("Follow", backref="users", foreign_keys="Follow.from_user_fk")

	class Config:
		orm_mode = True

class Comment(Base):
	__tablename__ = "comments"

	id = Column(Integer, primary_key=True, index=True)
	user_fk = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
	post_fk = Column(Integer, ForeignKey("posts.id", ondelete="CASCADE"), nullable=False)
	text = Column(String(500), nullable=False)
	screen_name = Column(String(50), default="furu", nullable=True)
	profile_picture_path = Column(String(500), default="furu", nullable=True)
	created_at = Column(DateTime, server_default=func.now(), nullable=False)
	updated_at = Column(DateTime, server_default=func.now(), server_onupdate=func.now(), nullable=False)

	class Config:
		orm_mode = True

class Post(Base):
	__tablename__ = "posts"

	id = Column(Integer, primary_key=True, index=True)
	user_fk = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
	before_picture_path = Column(String(500), nullable=False)
	after_picture_path = Column(String(500), nullable=False)
	before_text = Column(String(500), nullable=False)
	after_text = Column(String(500), nullable=False)
	created_at = Column(DateTime, server_default=func.now(), nullable=False)
	updated_at = Column(DateTime, server_default=func.now(), server_onupdate=func.now(), nullable=False)
	is_deleted = Column(Boolean, default=False, nullable=False)
	
	comments = relationship("Comment", backref="posts")
	likes = relationship("Like", backref="posts")

	class Config:
		orm_mode = True

class Like(Base):
	__tablename__ = "likes"

	id = Column(Integer, primary_key=True, index=True)
	user_fk = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
	post_fk = Column(Integer, ForeignKey("posts.id", ondelete="CASCADE"), nullable=False)
	created_at = Column(DateTime, server_default=func.now(), nullable=False)
	updated_at = Column(DateTime, server_default=func.now(), server_onupdate=func.now(), nullable=False)

	class Config:
		orm_mode = True

class Follow(Base):
	__tablename__ = "follows"

	id = Column(Integer, primary_key=True, index=True)
	from_user_fk = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
	to_user_fk = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
	created_at = Column(DateTime, server_default=func.now(), nullable=False)
	updated_at = Column(DateTime, server_default=func.now(), server_onupdate=func.now(), nullable=False)

	class Config:
		orm_mode = True