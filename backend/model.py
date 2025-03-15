from sqlalchemy import Column, Integer, String, Float, ForeignKey
from database import Base


# Student Model
class Student(Base):
    __tablename__ = "students"

    enrollment_no = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    age = Column(Integer)
    quiz_score = Column(Float)
    attendance = Column(Float)
    studytime = Column(Float)
    engagement_score = Column(Float)



# Performance Model
class Performance(Base):
    __tablename__ = "performance"

    id = Column(Integer, primary_key=True, index=True)
    student_id = Column(Integer, ForeignKey("students.id"))
    quiz_score = Column(Float)
    study_time = Column(Float)
