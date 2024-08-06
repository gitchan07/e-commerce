from sqlalchemy import (
    Column,
    Integer,
    String,
    Text,
    DECIMAL,
    DateTime,
    ForeignKey,
    func,
)
from sqlalchemy.orm import relationship
from .Base import Base
from models.Users import Users
from models.Categories import Category


class Product(Base):
    __tablename__ = "products"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    category_id = Column(Integer, ForeignKey("category.id"))
    title = Column(String(255), nullable=False)
    description = Column(Text)
    stock = Column(Integer)
    price = Column(DECIMAL(10, 2))
    promotion = Column(DECIMAL(10, 2))
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())

    user = relationship("users", back_populates="products")
    category = relationship("category", back_populates="products")

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "category_id": self.category_id,
            "title": self.title,
            "description": self.description,
            "stock": self.stock,
            "price": str(self.price),
            "promotion": str(self.promotion),
            "created_at": self.created_at.isoformat(),
            "updated_at": self.updated_at.isoformat(),
        }
