from sqlalchemy import Integer, String, DateTime
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship, mapped_column
from models.Base import Base
from flask_login import UserMixin
import bcrypt


class Users(Base, UserMixin):
    __tablename__ = "Users"
    id = mapped_column(Integer, primary_key=True, autoincrement=True)
    username = mapped_column(String(255))
