from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class UserBase(BaseModel):
    email: str
    full_name: str

class UserCreate(UserBase):
    password: str

class User(UserBase):
    id: int
    
    class Config:
        from_attributes = True

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

class UserProgress(BaseModel):
    id: int
    user_id: int
    vocabulary_id: int
    mastery_level: int
    last_reviewed: datetime

    class Config:
        from_attributes = True

class VocabularyContext(BaseModel):
    context: str
    word: str
    options: List[str]
    correct_answer: str

class Token(BaseModel):
    access_token: str
    token_type: str 