import json
from database import db


class Student:
    def __init__(self, enrollment_no, name, quiz_score, attendance, studytime, engagement_score):
        self.enrollment_no = enrollment_no
        self.name = name
        self.quiz_score = quiz_score
        self.attendance = attendance
        self.studytime = studytime
        self.engagement_score = engagement_score

    def save(self):
        student_ref = db.collection("students").document(str(self.enrollment_no))
        student_ref.set(self.__dict__) 

    @staticmethod
    def get_student(enrollment_no):
        student_ref = db.collection("students").document(str(enrollment_no)).get()
        if student_ref.exists:
            return json.dumps(student_ref.to_dict())  
        return json.dumps({"error": "Student not found"})


class Performance:
    def __init__(self, enrollment_no, quiz_score, study_time):
        self.enrollment_no = enrollment_no
        self.quiz_score = quiz_score
        self.study_time = study_time

    def save(self):
        performance_ref = (
            db.collection("students")
            .document(str(self.enrollment_no))
            .collection("performance")
            .document()
        )
        performance_ref.set(self.__dict__)  

    @staticmethod
    def get_performance(enrollment_no):
        performance_ref = (
            db.collection("students").document(str(enrollment_no)).collection("performance").stream()
        )
        return json.dumps([entry.to_dict() for entry in performance_ref])  
