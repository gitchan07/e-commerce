from sqlalchemy import Integer, String, Date, DateTime, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship, mapped_column
from models.Base import Base


class Transactions(Base):
    __tablename__ = "transactions"
    id = mapped_column(Integer, primary_key=True, autoincrement=True)
    date = mapped_column(Date, nullable=False)
    transaction_number = mapped_column(String(50), nullable=False)
    user_id = mapped_column(Integer, ForeignKey("users.id"))
    created_at = mapped_column(DateTime, default=func.now())
    updated_at = mapped_column(DateTime, default=func.now(), onupdate=func.now())

    user = relationship("Users", back_populates="transactions")
    transaction_details = relationship(
        "TransactionDetails", back_populates="transaction"
    )
