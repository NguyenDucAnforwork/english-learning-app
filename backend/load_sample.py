import json
from sqlalchemy.orm import Session
from database import SessionLocal
from models import User, PersonalizedStory, Exercise
from datetime import datetime

db: Session = SessionLocal()

with open('samples.json', encoding='utf-8') as f:
    data = json.load(f)

# Giả sử exercises này thuộc về user có id=1
user = db.query(User).filter(User.id == 1).first()
if not user:
    print("User id=1 does not exist, please register a user first.")
else:
    for item in data:
        story_data = item['story']

        story = PersonalizedStory(
            user_id=user.id,
            title=story_data['title'],
            vocabulary=json.dumps(story_data['vocabulary']),
            content=story_data['content'],
            created_at=datetime.fromisoformat(item['created_at'])
        )
        db.add(story)
        db.commit()
        db.refresh(story)

        exercise = Exercise(
            story_id=story.id,
            created_at=story.created_at
        )
        db.add(exercise)
        db.commit()

print("✅ Loaded sample data successfully.")
db.close()
