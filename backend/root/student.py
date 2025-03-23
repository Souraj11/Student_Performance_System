from fastapi import APIRouter, HTTPException
from google.cloud import firestore
from pydantic import BaseModel
import logging

# Initialize Firestore client
db = firestore.Client()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize APIRouter
router = APIRouter()

# Pydantic models for request validation
class StudentSchema(BaseModel):
    name: str
    engagement_score: float
    attendance: float
    studytime: float
    enrollment_no: int

# Endpoint to create a student and add a session
@router.post("/students/")
async def create_student(student: StudentSchema):
    try:
        enrollment_no_str = str(student.enrollment_no)
        logger.info(f"Creating/updating student with enrollment number: {enrollment_no_str}")

        student_ref = db.collection("students").document(enrollment_no_str)

        # Create student document if it doesn't exist
        if not student_ref.get().exists:
            student_ref.set({
                "name": student.name,
                "enrollment_no": student.enrollment_no,
            })
            logger.info(f"Student document created with name: {student.name} and enrollment_no: {student.enrollment_no}")
        else:
            logger.info(f"Student document already exists for enrollment number: {enrollment_no_str}")

        # Add new session
        sessions_ref = student_ref.collection("sessions")
        sessions_count = len(list(sessions_ref.stream()))

        session_id = f"session{sessions_count + 1}"
        session_data = {
            "engagement_score": student.engagement_score,
            "attendance": student.attendance,
            "studytime": student.studytime,
            "timestamp": firestore.SERVER_TIMESTAMP,
        }
        sessions_ref.document(session_id).set(session_data)

        logger.info(f"Session {session_id} added for student {enrollment_no_str}")
        return {"message": "Student session added successfully"}

    except Exception as e:
        logger.error(f"Error creating student session: {e}")
        raise HTTPException(status_code=500, detail="An error occurred while adding the student session")

# Endpoint to fetch student data
@router.get("/students/{enrollment_no}")
async def get_student(enrollment_no: str):
    try:
        logger.info(f"Fetching student with enrollment number: {enrollment_no}")
        student_ref = db.collection("students").document(enrollment_no)
        student = student_ref.get()

        if not student.exists:
            logger.warning(f"Student with enrollment number {enrollment_no} not found")
            raise HTTPException(status_code=404, detail="Student not found")

        student_data = student.to_dict()
        logger.info(f"Student data retrieved: {student_data}")

        if "name" not in student_data or "enrollment_no" not in student_data:
            raise HTTPException(status_code=500, detail="Invalid student data in Firestore")

        return {
            "name": student_data["name"],
            "enrollment_no": student_data["enrollment_no"],
        }

    except HTTPException as e:
        raise e
    except Exception as e:
        logger.error(f"Error fetching student: {e}")
        raise HTTPException(status_code=500, detail="An error occurred while fetching the student")

# Endpoint to fetch sessions for a student
@router.get("/students/{enrollment_no}/sessions")
async def get_sessions(enrollment_no: str):
    try:
        logger.info(f"Fetching sessions for enrollment number: {enrollment_no}")
        student_ref = db.collection("students").document(enrollment_no)

        # Check if the student exists
        if not student_ref.get().exists:
            logger.warning(f"Student with enrollment number {enrollment_no} not found")
            raise HTTPException(status_code=404, detail="Student not found")

        # Fetch sessions from the sessions subcollection
        sessions_ref = student_ref.collection("sessions").order_by("timestamp", direction=firestore.Query.DESCENDING).stream()
        sessions = [session.to_dict() for session in sessions_ref]

        return sessions

    except HTTPException as e:
        raise e
    except Exception as e:
        logger.error(f"Error fetching sessions: {e}")
        raise HTTPException(status_code=500, detail="An error occurred while fetching sessions")