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

# Pydantic model for quiz submission
class QuizSubmission(BaseModel):
    enrollment_no: int
    answers: list[int]  # List of selected answer indices (e.g., [0, 1, 2])

# Sample quiz questions
QUIZ_QUESTIONS = [
    {
        "question": "What is the capital of France?",
        "options": ["Paris", "London", "Berlin", "Madrid"],
        "correct_answer": 0,
    },
    {
        "question": "What is 2 + 2?",
        "options": ["3", "4", "5", "6"],
        "correct_answer": 1,
    },
]

# Endpoint to fetch quiz questions
@router.get("/quiz/questions")
async def get_quiz_questions():
    try:
        logger.info("Fetching quiz questions")
        return {"questions": QUIZ_QUESTIONS}
    except Exception as e:
        logger.error(f"Error fetching quiz questions: {e}")
        raise HTTPException(status_code=500, detail="An error occurred while fetching quiz questions")

# Endpoint to submit quiz answers and calculate score
@router.post("/quiz/submit")
async def submit_quiz(quiz_submission: QuizSubmission):
    try:
        logger.info(f"Submitting quiz for enrollment number: {quiz_submission.enrollment_no}")

        # Calculate score
        score = 0
        for i, answer in enumerate(quiz_submission.answers):
            if answer == QUIZ_QUESTIONS[i]["correct_answer"]:
                score += 1

        # Store the score in Firestore
        enrollment_no_str = str(quiz_submission.enrollment_no)
        student_ref = db.collection("students").document(enrollment_no_str)

        # Check if the student exists
        if not student_ref.get().exists:
            logger.warning(f"Student with enrollment number {enrollment_no_str} not found")
            raise HTTPException(status_code=404, detail="Student not found")

        # Get the current count of quiz scores to generate the next sequential ID
        quiz_scores_ref = student_ref.collection("quiz_scores")
        quiz_scores_count = len(list(quiz_scores_ref.stream()))

        # Generate the next sequential ID
        next_quiz_id = str(quiz_scores_count + 1)

        # Add the quiz score to the quiz_scores subcollection
        quiz_scores_ref.document(next_quiz_id).set({
            "quiz_id": next_quiz_id,
            "score": score,
            "total_questions": len(QUIZ_QUESTIONS),
            "timestamp": firestore.SERVER_TIMESTAMP,
        })

        logger.info(f"Quiz score stored for enrollment number: {enrollment_no_str}")
        return {
            "message": "Quiz submitted successfully",
            "score": score,
            "total_questions": len(QUIZ_QUESTIONS),
        }

    except HTTPException as e:
        logger.error(f"HTTPException: {e}")
        raise e
    except Exception as e:
        logger.error(f"Error submitting quiz: {e}")
        raise HTTPException(status_code=500, detail="An error occurred while submitting the quiz")

# Endpoint to fetch quiz scores for a student
@router.get("/students/{enrollment_no}/quiz_scores")
async def get_quiz_scores(enrollment_no: str):
    try:
        logger.info(f"Fetching quiz scores for enrollment number: {enrollment_no}")
        student_ref = db.collection("students").document(enrollment_no)

        # Check if the student exists
        if not student_ref.get().exists:
            logger.warning(f"Student with enrollment number {enrollment_no} not found")
            raise HTTPException(status_code=404, detail="Student not found")

        # Fetch quiz scores from the quiz_scores subcollection
        quiz_scores_ref = student_ref.collection("quiz_scores").order_by("timestamp", direction=firestore.Query.DESCENDING).stream()
        quiz_scores = [quiz_score.to_dict() for quiz_score in quiz_scores_ref]

        return quiz_scores

    except HTTPException as e:
        raise e
    except Exception as e:
        logger.error(f"Error fetching quiz scores: {e}")
        raise HTTPException(status_code=500, detail="An error occurred while fetching quiz scores")