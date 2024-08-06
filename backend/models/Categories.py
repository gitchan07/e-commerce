from sqlalchemy import Column, Integer, String, DateTime, func
from sqlalchemy.orm import relationship
from .Base import Base

class Category(Base):
    __tablename__ = 'category'
    
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String(100), nullable=False)
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())

    products = relationship("Product", back_populates="category")
