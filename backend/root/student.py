from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from model import Student

router = APIRouter()

# Create student
@router.post("/students/")
def create_student(name: str, age: int, quiz_score: float,attendance: float, studytime: float, engagement_score: float,db: Session = Depends(get_db)):
    student = Student(name=name, age=age, quiz_score=quiz_score,attendance=attendance,studytime=studytime,engament_score=engagement_score)
    db.add(student)
    db.commit()
    return student

# Get all students
@router.get("/students/")
def get_students(db: Session = Depends(get_db)):
    return db.query(Student).all()

