from sqlalchemy import Column, Integer, String, Text, ForeignKey, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from database import engine
from datetime import datetime

Base = declarative_base()

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    full_name = Column(String)

# ------------------ VOCABULARY ------------------ #
class Vocabulary(Base):
    __tablename__ = "vocabulary"

    id = Column(Integer, primary_key=True, index=True)
    word = Column(String, unique=True, index=True)
    meaning = Column(String)
    example = Column(String)

class UserProgress(Base):
    __tablename__ = "user_progress"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    vocabulary_id = Column(Integer, ForeignKey("vocabulary.id"))
    mastery_level = Column(Integer, default=0)  # 0-100
    last_reviewed = Column(DateTime)

    user = relationship("User")  # establish a relationship between the user and the user progress
    vocabulary = relationship("Vocabulary")  # establish a relationship between the vocabulary and the user progress

# ------------------ STORY ------------------ #
class PersonalizedStory(Base):
    __tablename__ = "personalized_stories"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    title = Column(String, index=True)
    content = Column(Text)
    vocabulary = Column(Text)  # lưu JSON: '["sun", "moon"]'
    created_at = Column(DateTime, default=datetime.now())

    user = relationship("User", back_populates="stories")
    exercises = relationship("Exercise", back_populates="story", cascade="all, delete")

# Gắn lại quan hệ 1-n từ User → Story
User.stories = relationship("PersonalizedStory", back_populates="user")

# ------------------ EXERCISE ------------------ #
class Exercise(Base):
    __tablename__ = 'exercises'

    id = Column(Integer, primary_key=True, index=True)
    story_id = Column(Integer, ForeignKey("personalized_stories.id"))  # <- fix chỗ này!
    created_at = Column(DateTime, default=datetime.now())

    story = relationship("PersonalizedStory", back_populates="exercises")
