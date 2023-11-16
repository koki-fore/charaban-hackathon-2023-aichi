from fastapi import FastAPI, status
from fastapi.middleware.cors import CORSMiddleware
from routers import posts, likes
from fastapi.exceptions import ResponseValidationError
from fastapi.responses import JSONResponse
from routers import posts, likes
import firebase_admin
from starlette.requests import Request


app = FastAPI()
app.include_router(posts.router)
app.include_router(likes.router)

firebase_admin.initialize_app()

#@app.exception_handler(ResponseValidationError)
#async def handler(request:Request, exc:ResponseValidationError):
#    print("="*50)
#    print(exc)
#    return JSONResponse(content={}, status_code=status.HTTP_422_UNPROCESSABLE_ENTITY)

# CORS設定
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)