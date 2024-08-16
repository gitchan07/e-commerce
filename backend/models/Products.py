from sqlalchemy import Column, Integer, String, DECIMAL, DateTime, ForeignKey, Boolean
from sqlalchemy.orm import relationship, mapped_column
from sqlalchemy.sql import func
from models.Base import Base
import datetime
import os
from dotenv import load_dotenv


load_dotenv()


class Products(Base):
    __tablename__ = "products"

    id = mapped_column(Integer, primary_key=True, autoincrement=True)
    user_id = mapped_column(Integer, ForeignKey("users.id"))
    category_id = mapped_column(Integer, ForeignKey("categories.id"))
    title = mapped_column(String(100), nullable=False)
    description = mapped_column(String(100))
    stock = mapped_column(Integer, nullable=False)
    price = mapped_column(DECIMAL(10, 2), nullable=False)
    # tambah baru
    img_path = mapped_column(String(100))
    is_active = mapped_column(Boolean)
    # tambah baru
    created_at = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at = mapped_column(DateTime(timezone=True), onupdate=func.now())

    users = relationship("Users", back_populates="products")
    categories = relationship("Categories", back_populates="products")
    transaction_details = relationship("TransactionDetails", back_populates="products")

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "category_id": self.category_id,
            "title": self.title,
            "description": self.description,
            "stock": self.stock,
            "price": str(self.price),
            "img_path": os.getenv("STORAGE")
            + "/"
            + os.getenv("UPLOAD_FOLDER")
            + "/"
            + self.img_path,
            "is_active": self.is_active,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
        }
