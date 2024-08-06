from sqlalchemy import Integer, String, Date, DateTime, ForeignKey
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship, mapped_column
from models.Base import Base


class Transactions(Base):
    __tablename__ = "transactions"
    id = mapped_column(Integer, primary_key=True, autoincrement=True)
    date = mapped_column(Date, nullable=False)
    transaction_number = mapped_column(
        String(50),
        nullable=False,
        default=lambda: accounts.generate_account_number(),
    )
    user_id = mapped_column(Integer, ForeignKey("users.id"))
    created_at = mapped_column(DateTime, default=func.now())
    updated_at = mapped_column(DateTime, default=func.now(), onupdate=func.now())

    user = relationship("users", back_populates="transactions")
    transaction_details = relationship(
        "transactionDetails", back_populates="transactions"
    )

    @staticmethod
    def generate_transactions_number():
        return str(uuid.uuid4()).replace("-", "").upper()[:12]
