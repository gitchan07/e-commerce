from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.orm import mapped_column
from sqlalchemy.sql import func
from models.Base import Base

class RevokedToken(Base):
    __tablename__ = "revoked_tokens"

    id = mapped_column(Integer, primary_key=True, autoincrement=True)
    jti = mapped_column(String(120), nullable=False)
    revoked_at = mapped_column(DateTime(timezone=True), server_default=func.now())

    def __init__(self, jti):
        self.jti = jti

    def to_dict(self):
        return {
            "id": self.id,
            "jti": self.jti,
            "revoked_at": self.revoked_at.isoformat(),
        }
