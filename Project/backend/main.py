from fastapi import FastAPI, Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
from database import engine, Base, SessionLocal
import models, schemas, utils
from fastapi import UploadFile, Form, File
import os
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
security = HTTPBearer()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)
Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security), db: Session = Depends(get_db)):
    token = credentials.credentials
    payload = utils.verify_access_token(token)
    if not payload:
        raise HTTPException(status_code=401, detail="Invalid token")
    user_id = payload.get("user_id")
    user = db.query(models.User).filter(models.User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

def get_current_admin(current_user: models.User = Depends(get_current_user)):
    if current_user.role != "admin":
        raise HTTPException(status_code=403, detail="Not enough permissions")
    return current_user

@app.post("/users", response_model=schemas.UserResponse)
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(models.User).filter(models.User.email == user.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    db_user = models.User(
        name=user.name,
        email=user.email,
        password=utils.hash_password(user.password)
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@app.get("/users", response_model=list[schemas.AdminUserResponse])
def read_users(current_user: models.User = Depends(get_current_admin), db: Session = Depends(get_db)):
    users = db.query(models.User).all()
    return users

@app.post("/login")
def login(user: schemas.UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if not db_user or not utils.verify_password(user.password, db_user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = utils.create_access_token({"user_id": db_user.id})
    return {"message": "Login successful", "access_token": token, "token_type": "bearer"}

@app.post("/feedback")
def submit_feedback(message: str, current_user: models.User = Depends(get_current_user), db: Session = Depends(get_db)):
    db_feedback = models.Feedback(
        message=message,
        user_id=current_user.id
    )
    db.add(db_feedback)
    db.commit()
    db.refresh(db_feedback)
    return {"message": "Feedback submitted successfully"}

@app.post("/news")
def create_news(img: UploadFile = File(...), title: str = Form(...), content: str = Form(...), current_user: models.User = Depends(get_current_admin), db: Session = Depends(get_db)):
    img_path = f"static/{img.filename}"
    os.makedirs("static", exist_ok=True)

    with open(img_path, "wb") as buffer:
        buffer.write(img.file.read())
    db_news = models.News(
        img=img_path,
        title=title,
        content=content
    )
    db.add(db_news)
    db.commit()
    db.refresh(db_news)
    return {"message": "News created successfully"}

@app.get("/news/{news_id}")
def read_news(news_id: int, db: Session = Depends(get_db)):
    news = db.query(models.News).filter(models.News.id == news_id).first()
    if not news:
        raise HTTPException(status_code=404, detail="News not found")
    return news

@app.get("/news")
def read_all_news(db: Session = Depends(get_db)):
    news_list = db.query(models.News).all()
    return news_list

@app.delete("/news/{news_id}")
def delete_news(news_id: int, current_user: models.User = Depends(get_current_admin), db: Session = Depends(get_db)):
    news = db.query(models.News).filter(models.News.id == news_id).first()
    if not news:
        raise HTTPException(status_code=404, detail="News not found")
    db.delete(news)
    db.commit()
    return {"message": "News deleted successfully"} 
