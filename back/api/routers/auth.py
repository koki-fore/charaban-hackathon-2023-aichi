from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from firebase_admin import auth
from db_sync_session import db_session
from models.db_models import User

def get_uid(auth_key: str = Depends(OAuth2PasswordBearer(tokenUrl="token"))):
    try:
        decoded_token = auth.verify_id_token(auth_key)
        return decoded_token["uid"]
    except:
        raise HTTPException(status_code=401, detail="Invalid auth key.")
    
def auth_user(uid: str = Depends(get_uid), db = Depends(db_session)):
    user = db.query(User).filter(User.firebase_id == uid).first()
    if user is None:
        raise HTTPException(status_code=404, detail="Invalid user.")
    return user