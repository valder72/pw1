from sqlalchemy import Column, Integer, String
from database import Base

class Feedback(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    email = Column(String, unique=True, index=True)
    password = Column(String)
    
    __tablename__ = "feedbacks"
    id = Column(Integer, primary_key=True, index=True)
    message = Column(String)