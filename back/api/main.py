from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import posts
import firebase_admin

app = FastAPI()
app.include_router(posts.router)

firebase_admin.initialize_app()

# CORS設定
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)