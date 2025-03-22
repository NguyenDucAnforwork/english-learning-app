from sqlalchemy.orm import Session
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from datetime import datetime, timedelta
from typing import Optional
from jose import JWTError, jwt
from passlib.context import CryptContext # for hashing password
import models # custom models
import schemas # custom schemas
import os
from dotenv import load_dotenv
from database import get_db

load_dotenv()

# Security
SECRET_KEY = os.getenv("SECRET_KEY") # to encode and decode jwt
ALGORITHM = "HS256" # algorithm to use for encoding and decoding jwt
ACCESS_TOKEN_EXPIRE_MINUTES = 30 # time to expire access token

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto") # create a password context to hash and verify passwords
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="token") # create an oauth2 scheme to authenticate users

def verify_password(plain_password, hashed_password):
    return pwd_context.verify(plain_password, hashed_password) # verify the password

def get_password_hash(password):
    return pwd_context.hash(password) # hash the password

def create_access_token(data: dict): # generate a jwt token, set an expiration time and encode it with the secret key
    to_encode = data.copy()
    expire = datetime.now() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def get_user(db: Session, user_id: int): # get an user by id
    return db.query(models.User).filter(models.User.id == user_id).first()

def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

def get_users(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.User).offset(skip).limit(limit).all()

def create_user(db: Session, user: schemas.UserCreate): # create a new user in the database based on the email, hashed password and full name
    hashed_password = get_password_hash(user.password)
    db_user = models.User(
        email=user.email,
        hashed_password=hashed_password,
        full_name=user.full_name
    )
    db.add(db_user) # add, commit and refresh
    db.commit()
    db.refresh(db_user)
    return db_user

def authenticate_user(db: Session, email: str, password: str): # extract user, verifypassword
    user = get_user_by_email(db, email)
    if not user:
        return False
    if not verify_password(password, user.hashed_password):
        return False
    return user

async def get_current_user(db: Session = Depends(get_db), token: str = Depends(oauth2_scheme)): # use db from create_db, emal from the JWT token
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        email: str = payload.get("sub") # retrieve the subject claim from the payload
        if email is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception
    user = get_user_by_email(db, email=email)
    if user is None:
        raise credentials_exception
    return user

# Vocabulary operations
def create_vocabulary(db: Session, vocabulary: schemas.VocabularyCreate):
    db_vocabulary = models.Vocabulary(**vocabulary.dict())
    db.add(db_vocabulary)
    db.commit()
    db.refresh(db_vocabulary)
    return db_vocabulary

def get_vocabulary(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Vocabulary).offset(skip).limit(limit).all()

def update_user_progress(db: Session, user_id: int, vocabulary_id: int, mastery_level: int):
    db_progress = db.query(models.UserProgress).filter(
        models.UserProgress.user_id == user_id,
        models.UserProgress.vocabulary_id == vocabulary_id
    ).first()
    
    if db_progress:
        db_progress.mastery_level = mastery_level
        db_progress.last_reviewed = datetime.now()
    else:
        db_progress = models.UserProgress(
            user_id=user_id,
            vocabulary_id=vocabulary_id,
            mastery_level=mastery_level,
            last_reviewed=datetime.now()
        )
        db.add(db_progress)
    
    db.commit()
    db.refresh(db_progress)
    return db_progress 