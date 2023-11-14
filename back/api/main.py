from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import posts

app = FastAPI()
app.include_router(posts.router)

# CORS設定
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)