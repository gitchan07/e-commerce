from sqlalchemy import Column, Integer, String, DECIMAL, DateTime
from sqlalchemy.orm import relationship, mapped_column
from sqlalchemy.sql import func
from models.Base import Base
import datetime


class Promotions(Base):
    __tablename__ = "promotion"

    id = mapped_column(Integer, primary_key=True, autoincrement=True)
    voucher_code = mapped_column(String(50), nullable=False)
    value_discount = mapped_column(DECIMAL(10, 2), nullable=False)
    description = mapped_column(String(100))
    created_at = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at = mapped_column(DateTime(timezone=True), onupdate=func.now())

    transactions = relationship("Transactions", back_populates="promotion")

    def to_dict(self):

        return {
            "id": self.id,
            "voucher_code": self.voucher_code,
            "value_discount": self.value_discount,
            "description": self.description,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
        }
