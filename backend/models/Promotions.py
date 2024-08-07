from sqlalchemy import Integer, String, DECIMAL, DateTime
from sqlalchemy.orm import relationship, mapped_column
from models.Base import Base


class Promotion(Base):
    __tablename__ = "promotion"
    id = mapped_column(Integer, primary_key=True, autoincrement=True)
    voucher_code = mapped_column(String(50), nullable=False)
    value_discount = mapped_column(DECIMAL(10, 2))
    description = mapped_column(String(100))
    created_at = mapped_column(DateTime, default=func.now())
    updated_at = mapped_column(DateTime, default=func.now(), onupdate=func.now())

    transactions = relationship("Transactions", back_populates="promotion")
