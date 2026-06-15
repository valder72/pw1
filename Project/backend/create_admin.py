from database import SessionLocal
from models import User
from utils import hash_password

db = SessionLocal()

admin = User(
    name="Admin",
    email="admin@cybersec.com",
    password=hash_password("Admin123"),
    role="admin"
)

db.add(admin)
db.commit()
print("Адмін створений!")
db.close()