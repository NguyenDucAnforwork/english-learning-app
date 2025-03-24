from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from models import Base, engine

from routers import auth, story, exercises

app = FastAPI(title="English Learning API")

# Create tables
Base.metadata.create_all(bind=engine)

# CORS setup
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(auth.router)
app.include_router(story.router)
app.include_router(exercises.router)

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
