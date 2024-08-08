from sqlalchemy import Column, Integer, DECIMAL, DateTime, ForeignKey
from sqlalchemy.orm import relationship, mapped_column
from sqlalchemy.sql import func
from models.Base import Base
import datetime


class TransactionDetails(Base):
    __tablename__ = "transaction_details"

    id = mapped_column(Integer, primary_key=True, autoincrement=True)
    transaction_id = mapped_column(Integer, ForeignKey("transactions.id"))
    product_id = mapped_column(Integer, ForeignKey("products.id"))
    quantity = mapped_column(Integer, nullable=False)
    price = mapped_column(DECIMAL(10, 2), nullable=False)
    created_at = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at = mapped_column(DateTime(timezone=True), onupdate=func.now())
    total_price_item = mapped_column(DECIMAL(10, 2), nullable=False)

    transactions = relationship("Transactions", back_populates="transaction_details")
    products = relationship("Products", back_populates="transaction_details")

    def to_dict(self):
        return {
            "id": self.id,
            "transaction_id": self.transaction_id,
            "product_id": self.product_id,
            "quantity": self.quantity,
            "price": self.price,
            "created_at": self.created_at.isoformat(),
            "updated_at": self.updated_at.isoformat(),
            "total_price_item": self.total_price_item,
        }
