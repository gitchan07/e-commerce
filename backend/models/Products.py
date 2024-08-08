from sqlalchemy import Integer, String, Text, DateTime, func, ForeignKey, DECIMAL
from sqlalchemy.orm import relationship, mapped_column
from models.Base import Base

class Product(Base):
    __tablename__ = "products"
    id = mapped_column(Integer, primary_key=True, autoincrement=True)
    user_id = mapped_column(Integer, ForeignKey("users.id"))
    category_id = mapped_column(Integer, ForeignKey("categories.id"))
    title = mapped_column(String(255), nullable=False)
    description = mapped_column(Text)
    stock = mapped_column(Integer)
    price = mapped_column(DECIMAL(10, 2))
    promotion_id = mapped_column(Integer, ForeignKey("promotions.id"))
    created_at = mapped_column(DateTime, default=func.now())
    updated_at = mapped_column(DateTime, default=func.now(), onupdate=func.now())

    user = relationship("Users", back_populates="products")
    category = relationship("Category", back_populates="products")
    transaction_details = relationship("TransactionDetails", back_populates="products")
    promotion = relationship("Promotion", back_populates="products")

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "category_id": self.category_id,
            "title": self.title,
            "description": self.description,
            "stock": self.stock,
            "price": str(self.price),
            "created_at": self.created_at.isoformat(),
            "updated_at": self.updated_at.isoformat(),
        }
