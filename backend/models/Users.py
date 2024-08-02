from sqlalchemy import Integer, String, DateTime
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship, mapped_column
from models.Base import Base
from flask_login import UserMixin
import bcrypt


class Users(Base, UserMixin):
    """
    Table: Users
    args:
        id: INT AUTO_INCREMENT PRIMARY KEY
            - Description: Unique identifier for each user
            - Constraints: Primary key, Auto increment

        username: VARCHAR(50) NOT NULL
            - Description: Username of the user
            - Constraints: Not null

        role: ENUM('seller', 'buyer') NOT NULL
            - Description: Role of the user, either seller or buyer
            - Constraints: Not null, Enum values

        email: VARCHAR(100) NOT NULL
            - Description: Email address of the user
            - Constraints: Not null

        full_name: VARCHAR(100)
            - Description: Full name of the user
            - Constraints: Optional

        address: TEXT
            - Description: Address of the user
            - Constraints: Optional

        password_hash: VARCHAR(255) NOT NULL
            - Description: Password of the user
            - Constraints: Not null

        created_at: TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            - Description: Timestamp when the record was created
            - Constraints: Default current timestamp

        updated_at: TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            - Description: Timestamp when the record was last updated
            - Constraints: Default current timestamp, Updates on record update

    """

    __tablename__ = "users"
    id = mapped_column(Integer, primary_key=True, autoincrement=True)
    username = mapped_column(String(50), unique=True, nullable=False)
    role = mapped_column(String(10), nullable=False)  # change to enum
    email = mapped_column()
    full_name = mapped_column()
    address = mapped_column()
    password_hash = mapped_column(String(225), nullable=False)
    created_at = mapped_column(DateTime, default=func.now())
    updated_at = mapped_column(DateTime, default=func.now(), onupdate=func.now())

    def set_password(self, password):
        self.password_hash = bcrypt.hashpw(
            password.encode("utf-8"), bcrypt.gensalt()
        ).decode("utf-8")

    def check_password(self, password):
        return bcrypt.checkpw(
            password.encode("utf-8"), self.password_hash.encode("utf-8")
        )
