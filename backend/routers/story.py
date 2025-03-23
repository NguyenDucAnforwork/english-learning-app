from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List

import schemas
import crud
from database import get_db

router = APIRouter()

@router.post("/story/generate", response_model=schemas.StoryOut)
def generate_story(
    payload: schemas.StoryCreate,
    current_user: schemas.User = Depends(crud.get_current_user),
    db: Session = Depends(get_db)
):
    vocab_str = ', '.join(payload.vocabulary)
    content = (
        f"Once upon a time, a young learner wanted to master the words: {vocab_str}. "
        f"They embarked on a journey full of mystery and discovery..."
    )
    return crud.create_story(db, current_user.id, payload.title, payload.vocabulary, content)

@router.get("/story/list", response_model=List[schemas.StoryOut])
def get_user_stories(
    current_user: schemas.User = Depends(crud.get_current_user),
    db: Session = Depends(get_db)
):
    return crud.get_stories_by_user(db, current_user.id)
