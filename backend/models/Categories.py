from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.orm import relationship, mapped_column
from sqlalchemy.sql import func
from models.Base import Base
import datetime


class Categories(Base):
    __tablename__ = "categories"

    id = mapped_column(Integer, primary_key=True, autoincrement=True)
    name = mapped_column(String(100), nullable=False)
    created_at = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at = mapped_column(DateTime(timezone=True), onupdate=func.now())

    products = relationship("Products", back_populates="categories")

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
        }
