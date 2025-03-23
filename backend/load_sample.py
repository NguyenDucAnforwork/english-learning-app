import json
from datetime import datetime
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from models import Base, User, PersonalizedStory, Exercise

# 🛠 Sửa đường dẫn nếu bạn dùng PostgreSQL / MySQL
DATABASE_URL = "sqlite:///./test.db"

engine = create_engine(DATABASE_URL, connect_args={"check_same_thread": False})
Session = sessionmaker(bind=engine)
session = Session()

# 🔽 Đọc dữ liệu từ file sample_exercises.json
with open("../frontend/app/exercises/sample_exercises.json", "r") as f:
    sample_data = json.load(f)

# 🧠 Giả sử đã có user có id=1
user = session.query(User).filter(User.id == 1).first()
if not user:
    raise ValueError("❌ User with id=1 not found. Please register a user first.")

# ✍️ Tạo story
story = PersonalizedStory(
    user_id=user.id,
    title=sample_data["story"]["title"],
    content=sample_data["story"]["content"],
    vocabulary=json.dumps(sample_data["story"]["vocabulary"]),
    created_at=datetime.strptime(sample_data["created_at"], "%Y-%m-%dT%H:%M:%S")
)
session.add(story)
session.commit()

# 📚 Tạo exercise tương ứng
exercise = Exercise(
    story_id=story.id,
    created_at=story.created_at
)
session.add(exercise)
session.commit()

print(f"✅ Inserted story id={story.id} and exercise id={exercise.id}")
