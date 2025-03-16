from fastapi import FastAPI
from root.student import router as student_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(student_router, prefix="/api")

@app.get("/")
def root():
    return {"message": "Student Performance Analysis API is running"}
