from fastapi import APIRouter, HTTPException
from google.cloud import firestore
from pydantic import BaseModel
import logging


db = firestore.Client()

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


router = APIRouter()


class StudentSchema(BaseModel):
    enrollment_no: int 
    name: str
    quiz_score: float
    attendance: float
    studytime: float
    engagement_score: float


@router.post("/students/")
async def create_student(student: StudentSchema):
    try:
      
        enrollment_no_str = str(student.enrollment_no)
        logger.info(f"Creating student with enrollment number: {enrollment_no_str}")

        student_ref = db.collection("students").document(enrollment_no_str)
        if student_ref.get().exists:
            logger.warning(f"Student with enrollment number {enrollment_no_str} already exists")
            raise HTTPException(status_code=400, detail="Student with this enrollment number already exists")

        student_ref.set(student.model_dump())
        logger.info(f"Student {enrollment_no_str} added successfully")

        return {"message": "Student added successfully", **student.model_dump()}

    except Exception as e:
        logger.error(f"Error creating student: {e}")
        raise HTTPException(status_code=500, detail="An error occurred while adding the student")


@router.get("/students/")
async def get_students():
    try:
        logger.info("Fetching all students")
        students = [doc.to_dict() for doc in db.collection("students").stream()]
        return students

    except Exception as e:
        logger.error(f"Error fetching students: {e}")
        raise HTTPException(status_code=500, detail="An error occurred while fetching students")


@router.get("/students/{enrollment_no}")
async def get_student(enrollment_no: str):
    try:
        logger.info(f"Fetching student with enrollment number: {enrollment_no}")
        student_ref = db.collection("students").document(enrollment_no)
        student = student_ref.get()

        if not student.exists:
            logger.warning(f"Student with enrollment number {enrollment_no} not found")
            raise HTTPException(status_code=404, detail="Student not found")

        return student.to_dict()

    except Exception as e:
        logger.error(f"Error fetching student: {e}")
        raise HTTPException(status_code=500, detail="An error occurred while fetching the student")

@router.put("/students/{enrollment_no}")
async def update_student(enrollment_no: str, updated_data: StudentSchema):
    try:
        logger.info(f"Updating student with enrollment number: {enrollment_no}")
        student_ref = db.collection("students").document(enrollment_no)

        if not student_ref.get().exists:
            logger.warning(f"Student with enrollment number {enrollment_no} not found")
            raise HTTPException(status_code=404, detail="Student not found")

       
        student_ref.update(updated_data.model_dump())
        logger.info(f"Student {enrollment_no} updated successfully")

        return {"message": "Student updated successfully"}

    except Exception as e:
        logger.error(f"Error updating student: {e}")
        raise HTTPException(status_code=500, detail="An error occurred while updating the student")


@router.delete("/students/{enrollment_no}")
async def delete_student(enrollment_no: str):
    try:
        logger.info(f"Deleting student with enrollment number: {enrollment_no}")
        student_ref = db.collection("students").document(enrollment_no)

        if not student_ref.get().exists:
            logger.warning(f"Student with enrollment number {enrollment_no} not found")
            raise HTTPException(status_code=404, detail="Student not found")

        student_ref.delete()
        logger.info(f"Student {enrollment_no} deleted successfully")

        return {"message": "Student deleted successfully"}

    except Exception as e:
        logger.error(f"Error deleting student: {e}")
        raise HTTPException(status_code=500, detail="An error occurred while deleting the student")