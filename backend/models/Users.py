from sqlalchemy import Integer, String, Text, DateTime, func
from sqlalchemy.orm import relationship, mapped_column
from flask_login import UserMixin
import bcrypt
from models.Base import Base
import datetime


class Users(Base, UserMixin):
    __tablename__ = "users"

    id = mapped_column(Integer, primary_key=True, autoincrement=True)
    username = mapped_column(String(50), nullable=False, unique=True)
    role = mapped_column(String(50), nullable=False)
    email = mapped_column(String(100), nullable=False)
    full_name = mapped_column(String(100), nullable=False)
    address = mapped_column(String(100))
    password_hash = mapped_column(String(255), nullable=False)
    created_at = mapped_column(DateTime, default=func.now())
    updated_at = mapped_column(DateTime, default=func.now(), onupdate=func.now())

    def set_password(self, password):
        self.password_hash = bcrypt.hashpw(
            password.encode("utf-8"), bcrypt.gensalt()
        ).decode("utf-8")

    def check_password(self, password):
        return bcrypt.checkpw(
            password.encode("utf-8"), self.password_hash.encode("utf-8")
        )

    products = relationship("Products", back_populates="users")
    transactions = relationship("Transactions", back_populates="users")

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "role": self.role,
            "email": self.email,
            "full_name": self.full_name,
            "address": self.address,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
        }
