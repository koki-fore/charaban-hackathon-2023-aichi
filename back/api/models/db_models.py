from sqlalchemy import Column, Integer, String, DateTime, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from db_sync_session import Base

class User(Base):
	__tablename__ = "user"

	id = Column(Integer, primary_key=True, index=True)
	firebase_id = Column(String(50), nullable=False)
	screen_name = Column(String(50), nullable=False)
	description = Column(String(500), nullable=False)
	profile_picture_path = Column(String(500), nullable=False)
	created_at = Column(DateTime, server_default=func.now(), nullable=False)
	updated_at = Column(DateTime, server_default=func.now(), server_onupdate=func.now(), nullable=False)
	is_deleted = Column(Boolean, default=False, nullable=False)

	comments = relationship("Comment", backref="user")
	posts = relationship("Post", backref="user")
	likes = relationship("Like", backref="user")
	follows = relationship("Follow", backref="user", foreign_keys="Follow.from_user_fk")

	class Config:
		orm_mode = True

class Comment(Base):
	__tablename__ = "comment"

	id = Column(Integer, primary_key=True, index=True)
	user_fk = Column(Integer, ForeignKey("user.id", ondelete="CASCADE"), nullable=False)
	post_fk = Column(Integer, ForeignKey("post.id", ondelete="CASCADE"), nullable=False)
	text = Column(String(500), nullable=False)
	screen_name = Column(String(50), default="furu", nullable=True)
	profile_picture_path = Column(String(500), default="furu", nullable=True)
	created_at = Column(DateTime, server_default=func.now(), nullable=False)
	updated_at = Column(DateTime, server_default=func.now(), server_onupdate=func.now(), nullable=False)

	class Config:
		orm_mode = True

class Post(Base):
	__tablename__ = "post"

	id = Column(Integer, primary_key=True, index=True)
	user_fk = Column(Integer, ForeignKey("user.id", ondelete="CASCADE"), nullable=False)
	before_picture_path = Column(String(500), nullable=False)
	after_picture_path = Column(String(500), nullable=False)
	before_text = Column(String(500), nullable=False)
	after_text = Column(String(500), nullable=False)
	created_at = Column(DateTime, server_default=func.now(), nullable=False)
	updated_at = Column(DateTime, server_default=func.now(), server_onupdate=func.now(), nullable=False)
	is_deleted = Column(Boolean, default=False, nullable=False)
	
	comments = relationship("Comment", backref="post")
	likes = relationship("Like", backref="post")

	class Config:
		orm_mode = True

class Like(Base):
	__tablename__ = "like"

	id = Column(Integer, primary_key=True, index=True)
	user_fk = Column(Integer, ForeignKey("user.id", ondelete="CASCADE"), nullable=False)
	post_fk = Column(Integer, ForeignKey("post.id", ondelete="CASCADE"), nullable=False)
	created_at = Column(DateTime, server_default=func.now(), nullable=False)
	updated_at = Column(DateTime, server_default=func.now(), server_onupdate=func.now(), nullable=False)

	class Config:
		orm_mode = True

class Follow(Base):
	__tablename__ = "follow"

	id = Column(Integer, primary_key=True, index=True)
	from_user_fk = Column(Integer, ForeignKey("user.id", ondelete="CASCADE"), nullable=False)
	to_user_fk = Column(Integer, ForeignKey("user.id", ondelete="CASCADE"), nullable=False)
	created_at = Column(DateTime, server_default=func.now(), nullable=False)
	updated_at = Column(DateTime, server_default=func.now(), server_onupdate=func.now(), nullable=False)

	class Config:
		orm_mode = True