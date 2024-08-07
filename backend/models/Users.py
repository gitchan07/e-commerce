from sqlalchemy import Integer, String, Text, DateTime, func
from sqlalchemy.orm import relationship, mapped_column
from flask_login import UserMixin
import bcrypt
from models.Base import Base


class Users(Base, UserMixin):
    __tablename__ = "users"
    id = mapped_column(Integer, primary_key=True, autoincrement=True)
    username = mapped_column(String(50), unique=True, nullable=False)
    role = mapped_column(String(10), nullable=False)
    email = mapped_column(String(100), nullable=False)
    full_name = mapped_column(String(100))
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

    products = relationship("Product", back_populates="user")
    transactions = relationship(
        "Transactions", back_populates="user"
    )  # Added relationship
