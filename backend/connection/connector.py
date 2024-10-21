from sqlalchemy import create_engine
import os
from dotenv import load_dotenv
from sqlalchemy.orm import sessionmaker

load_dotenv()

username = os.getenv("DB_USERNAME")
password = os.getenv("DB_PASSWORD")
host = os.getenv("DB_HOST")
database = os.getenv("DB_DATABASE")

print(f"Username: {username}")
print(f"Password: {password}")
print(f"Host: {host}")
print(f"Database: {database}")

print(f"Connecting to {database} database at {host}")

try:
    engine = create_engine(
        f"mysql+mysqlconnector://{username}:lia123@db/{database}",
        pool_size=200,
        max_overflow=10000,
        pool_timeout=30,
        pool_recycle=3000,
        pool_pre_ping=True,
    )
    connection = engine.connect()
    print(f"Successfully connected to {host}")
except Exception as e:
    print(f"Failed to connect: {e}")

Session = sessionmaker(bind=connection)
session = Session()
