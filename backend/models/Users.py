from sqlalchemy import Column, Integer, String, Text, DateTime, func
from sqlalchemy.orm import relationship, declarative_base
from flask_login import UserMixin
import bcrypt

Base = declarative_base()

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

        role: VARCHAR(10) NOT NULL
            - Description: Role of the user, either 'seller' or 'buyer'
            - Constraints: Not null

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
    id = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(String(50), unique=True, nullable=False)
    role = Column(String(10), nullable=False) 
    email = Column(String(100), nullable=False)
    full_name = Column(String(100))
    address = Column(Text)
    password_hash = Column(String(255), nullable=False)
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())

    def set_password(self, password):
        self.password_hash = bcrypt.hashpw(
            password.encode("utf-8"), bcrypt.gensalt()
        ).decode("utf-8")

    def check_password(self, password):
        return bcrypt.checkpw(
            password.encode("utf-8"), self.password_hash.encode("utf-8")
        )

    products = relationship("Product", back_populates="user")
