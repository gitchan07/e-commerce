from sqlalchemy import Integer, String, Date, DateTime, ForeignKey, DECIMAL
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship, mapped_column
from models.Base import Base
import uuid


class Transactions(Base):
    __tablename__ = "transactions"
    id = mapped_column(Integer, primary_key=True, autoincrement=True)
    date = mapped_column(Date, nullable=False)
    transaction_number = mapped_column(
        String(50),
        nullable=False,
        default=lambda: Transactions.generate_transactions_number(),
    )
    user_id = mapped_column(Integer, ForeignKey("users.id"))
    promotion_id = mapped_column(Integer, ForeignKey("promotion.id"))
    total_price_all = mapped_column(DECIMAL(10, 2), default=0.00)
    transaction_status = mapped_column(String(20))
    created_at = mapped_column(DateTime, default=func.now())
    updated_at = mapped_column(DateTime, default=func.now(), onupdate=func.now())

    user = relationship("Users", back_populates="transactions")
    transaction_details = relationship(
        "TransactionDetails", back_populates="transaction"
    )
    promotion = relationship("Promotion", back_populates="transactions")

    @staticmethod
    def generate_transactions_number():
        return str(uuid.uuid4()).replace("-", "").upper()[:12]

    def to_dict(self):
        return {
            key: value
            for key, value in self.__dict__.items()
            if not key.startswith("_sa_")
        }
