from fastapi import Depends, HTTPException
from sqlalchemy.orm import Session
from fastapi.security import OAuth2PasswordBearer
from firebase_admin import auth
from db_sync_session import db_session
from cruds.user_crud import get_user_by_firebase

def get_uid(auth_key: str = Depends(OAuth2PasswordBearer(tokenUrl="token"))):
    try:
        decoded_token = auth.verify_id_token(auth_key)
        return decoded_token["uid"]
    except:
        raise HTTPException(status_code=401, detail="Invalid auth key.")
    
def auth_user(db: Session, uid: str = Depends(get_uid)):
    user = get_user_by_firebase(db, uid)
    if user is None:
        raise HTTPException(status_code=404, detail="Invalid user.")
    return user