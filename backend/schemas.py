from pydantic import BaseModel, field_validator
from typing import List, Optional
from datetime import datetime
import json

# --- USER --- #
class UserBase(BaseModel):
    email: str
    full_name: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int

    class Config:
        from_attributes = True


# --- VOCABULARY --- #
class VocabularyBase(BaseModel):
    word: str
    meaning: str
    example: str

class VocabularyCreate(VocabularyBase):
    pass

class Vocabulary(VocabularyBase):
    id: int

    class Config:
        from_attributes = True


# --- USER PROGRESS --- #
class UserProgress(BaseModel):
    id: int
    user_id: int
    vocabulary_id: int
    mastery_level: int
    last_reviewed: datetime

    class Config:
        from_attributes = True


# --- VOCABULARY CONTEXT --- #
class VocabularyContext(BaseModel):
    context: str
    word: str
    options: List[str]
    correct_answer: str


# --- TOKEN --- #
class Token(BaseModel):
    access_token: str
    token_type: str


# --- PERSONALIZED STORY --- #
class StoryCreate(BaseModel):
    title: str
    vocabulary: List[str]

class StoryOut(BaseModel):
    id: int
    title: str
    content: str
    vocabulary: List[str]
    created_at: datetime

    @field_validator("vocabulary", mode="before")
    @classmethod
    def parse_json_vocab(cls, value):
        if isinstance(value, str):
            return json.loads(value)
        return value

    class Config:
        orm_mode = True


# --- EXERCISE --- #
class ExerciseCreate(BaseModel):
    story_id: int

class ExerciseOut(BaseModel):
    id: int
    story_id: int
    created_at: datetime
    story: Optional[StoryOut]

    class Config:
        orm_mode = True
