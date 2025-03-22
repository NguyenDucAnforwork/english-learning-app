from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import relationship
from database import engine

Base = declarative_base()

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    full_name = Column(String)
    
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

    user = relationship("User") # establish a relationship between the user and the user progress
    vocabulary = relationship("Vocabulary") # establish a relationship between the vocabulary and the user progress