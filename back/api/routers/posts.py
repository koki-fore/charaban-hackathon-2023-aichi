from fastapi import APIRouter

router = APIRouter()

@router.get("/posts")
def list_posts():
    pass

@router.post("/posts")
def create_post():
    pass

@router.get("/posts/{post_id}/comments")
def list_commented_post():
    pass

@router.get("/posts/recommended")
def list_recommended_post():
    pass

@router.put("/posts/{posts_id}/delete")
def update_post_delete_at():
    pass
