from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

import crud
import schemas
from database import get_db

router = APIRouter()

@router.post("/exercises/create", response_model=schemas.ExerciseOut)
def create_exercise(
    exercise: schemas.ExerciseCreate,
    current_user: schemas.User = Depends(crud.get_current_user),
    db: Session = Depends(get_db)
):
    return crud.create_exercise(db, exercise.story_id)

@router.get("/exercises/list", response_model=List[schemas.ExerciseOut])
def list_exercises(
    current_user: schemas.User = Depends(crud.get_current_user),
    db: Session = Depends(get_db)
):
    return crud.get_exercises_by_user(db, current_user.id)

@router.delete("/exercise/{exercise_id}", status_code=204)
def delete_exercise(
    exercise_id: int,
    current_user: schemas.User = Depends(crud.get_current_user),
    db: Session = Depends(get_db)
):
    success = crud.delete_exercise(db, exercise_id)
    if not success:
        raise HTTPException(status_code=404, detail="Exercise not found")
