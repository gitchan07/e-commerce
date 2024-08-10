from functools import wraps
from flask import request, jsonify
from flask_jwt_extended import get_jwt_identity
from sqlalchemy.orm import sessionmaker
from models.Users import Users
from connection.connector import connection


def get_user_role(user_id):
    Session = sessionmaker(bind=connection)
    session = Session()
    try:
        user = session.query(Users).filter_by(id=user_id).first()
        return user.role if user else None
    except Exception as e:
        print(f"An error occurred: {e}")
        return None
    finally:
        session.close()


# Define the role_required decorator
def role_required(required_role):
    def decorator(f):
        @wraps(f)
        def decorated_function(*args, **kwargs):
            current_user_id = get_jwt_identity()
            user_role = get_user_role(current_user_id)
            if user_role != required_role:
                return (
                    jsonify(
                        {"message": f"Unauthorized - {user_role} role not permitted"}
                    ),
                    403,
                )
            return f(*args, **kwargs)

        return decorated_function

    return decorator
