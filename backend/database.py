from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

SQLALCHEMY_DATABASE_URL = "sqlite:///./app.db" # application will use SQLLite and the database file will be app.db in the current directory

engine = create_engine( # create an engine to connect to the database
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)

# create a new session factory; new commit and flush won't be automatically done
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base() # create a base class for all database models

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close() 