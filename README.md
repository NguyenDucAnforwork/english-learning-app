# English Learning App

A web application for learning English vocabulary in context.

## Features

- User authentication (Register/Login/Logout)
- Learn vocabulary in context with multiple choice questions
- Modern and responsive UI
- Backend API with FastAPI
- Frontend with Next.js and Tailwind CSS

## Project Structure

```
.
├── backend/
│   ├── main.py
│   ├── models.py
│   ├── schemas.py
│   ├── database.py
│   ├── crud.py
│   └── requirements.txt
└── frontend/
    ├── app/
    ├── components/
    ├── lib/
    └── package.json
```

## Setup and Installation

### Backend (FastAPI)

1. Create a virtual environment and activate it:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install dependencies:
```bash
cd backend
pip install -r requirements.txt
```

3. Run the backend server:
```bash
uvicorn main:app --reload
```

The backend API will be available at http://localhost:8000

### Frontend (Next.js)

1. Install dependencies:
```bash
cd frontend
npm install
```

2. Run the development server:
```bash
npm run dev
```

The frontend application will be available at http://localhost:3000

## Usage

1. Register a new account or login with existing credentials
2. Start learning vocabulary in context
3. Select the correct word to fill in the blank
4. Get immediate feedback on your answers
5. Move to the next question to continue learning

## API Documentation

The API documentation is available at http://localhost:8000/docs when the backend server is running. 