from sqlalchemy import Integer, String, DateTime
from sqlalchemy.orm import relationship, mapped_column
from sqlalchemy.sql import func

from models.Base import Base


class Category(Base):
    __tablename__ = "categories"
    id = mapped_column(Integer, primary_key=True, autoincrement=True)
    name = mapped_column(String(100), nullable=False)
    created_at = mapped_column(DateTime, default=func.now())
    updated_at = mapped_column(DateTime, default=func.now(), onupdate=func.now())

    products = relationship("Product", back_populates="category")
