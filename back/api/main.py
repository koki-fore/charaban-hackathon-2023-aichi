from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import user_router, post_router

app = FastAPI()

# CORS設定
app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(user_router.router)
app.include_router(post_router.router)