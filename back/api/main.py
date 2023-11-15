from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import posts, likes

app = FastAPI()
app.include_router(posts.router)
app.include_router(likes.router)

# CORS設定
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)