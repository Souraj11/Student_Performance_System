from fastapi import FastAPI
from database import engine, Base
from routes import student, ai

# Create FastAPI instance
app = FastAPI()

# Include student and AI routes
app.include_router(student.router)
app.include_router(ai.router)

# Initialize the database
Base.metadata.create_all(bind=engine)

@app.get("/")
def home():
    return {"message": "Student Performance API is running"}
