from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from root.student import router as student_router
from root.quiz import router as quiz_router  

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Allow frontend origin
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods
    allow_headers=["*"],  # Allow all headers
)

# Include routers
app.include_router(student_router, prefix="/api")
app.include_router(quiz_router, prefix="/api")

@app.get("/")
def root():
    return {"message": "Student Performance Analysis API is running"}