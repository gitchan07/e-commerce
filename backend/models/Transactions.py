from sqlalchemy import Column, Integer, String, DECIMAL, DateTime, ForeignKey
from sqlalchemy.orm import relationship, mapped_column
from sqlalchemy.sql import func
from models.Base import Base
import datetime
import uuid


class Transactions(Base):
    __tablename__ = "transactions"

    id = mapped_column(Integer, primary_key=True, autoincrement=True)
    user_id = mapped_column(Integer, ForeignKey("users.id"))
    promotion_id = mapped_column(Integer, ForeignKey("promotion.id"))
    datetime = mapped_column(DateTime(timezone=True), server_default=func.now())
    transaction_number = mapped_column(String(50), nullable=False)
    created_at = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_at = mapped_column(DateTime(timezone=True), onupdate=func.now())
    total_price_all_before = mapped_column(DECIMAL(10, 2), nullable=False)
    total_price_all_after = mapped_column(DECIMAL(10, 2))
    total_price_all = mapped_column(DECIMAL(10, 2))
    transaction_status = mapped_column(String(20), nullable=False)

    users = relationship("Users", back_populates="transactions")
    promotion = relationship("Promotions", back_populates="transactions")
    transaction_details = relationship(
        "TransactionDetails", back_populates="transactions"
    )

    def apply_promotions(self, promotion):
        if promotion and promotion.value_discount:
            discount_amount = self.total_price_all_before * (
                promotion.value_discount / 100
            )
            self.total_price_all_after = self.total_price_all_before - discount_amount
            self.total_price_all = self.total_price_all_after
        else:
            self.total_price_all_after = self.total_price_all_before
            self.total_price_all = self.total_price_all_before

    @staticmethod
    def generate_transactions_number():
        return str(uuid.uuid4()).replace("-", "").upper()[:12]

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "promotion_id": self.promotion_id,
            "datetime": self.datetime.isoformat(),
            "transaction_number": self.transaction_number,
            "total_price_all_before": self.total_price_all_before,
            "total_price_all_after": self.total_price_all_after,
            "total_price_all": self.total_price_all,
            "transaction_status": self.transaction_status,
            "created_at": self.created_at.isoformat() if self.created_at else None,
            "updated_at": self.updated_at.isoformat() if self.updated_at else None,
        }
