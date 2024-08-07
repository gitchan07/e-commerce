from sqlalchemy import create_engine
import os
from dotenv import load_dotenv

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
        f"mysql+mysqlconnector://{username}:{password}@{host}/{database}"
    )
    connection = engine.connect()
    print(f"Successfully connected to {host}")
    connection.close()
except Exception as e:
    print(f"Failed to connect: {e}")
