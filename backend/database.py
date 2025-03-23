import firebase_admin
from firebase_admin import credentials, firestore


cred = credentials.Certificate("C:\\Users\\soura\\Student_Performance_System\\backend\\student-performance-syst-a49d8-firebase-adminsdk-fbsvc-004baa13d6.json")
firebase_admin.initialize_app(cred)


db = firestore.client()
