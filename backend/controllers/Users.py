from flask import Blueprint, request, jsonify
from connection.connector import connection
from sqlalchemy.orm import sessionmaker
from models.Users import Users
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from sqlalchemy.exc import SQLAlchemyError

users_routes = Blueprint("users_routes ", __name__)

Session = sessionmaker(bind=connection)


@users_routes.route("/testing", methods=["GET"])
def testing():
    Session = sessionmaker(bind=connection)
    s = Session()
    try:
        user = s.query(Users).first()
        response = {
            "message": "good connection",
            "dict": user.to_dict() if user else "No users available",
        }
        status_code = 200
    except Exception as e:
        response = {"message": "connection failed", "error": str(e)}
        status_code = 500
    finally:
        s.close()

    return jsonify(response), status_code


def create_new_user(data):
    session = None
    try:
        # Validate required fields
        if not all(key in data for key in ("username", "email", "password", "role")):
            return {"message": "Missing required fields"}, 400

        session = Session()

        # Check if username or email already exists
        if (
            session.query(Users).filter_by(username=data["username"]).first()
            or session.query(Users).filter_by(email=data["email"]).first()
        ):
            return {"message": "Username or email already exists"}, 400

        # Create new user and hash the password
        new_user = Users(
            username=data["username"],
            email=data["email"],
            role=data["role"],
            full_name=data.get("full_name"),
            address=data.get("address"),
        )
        new_user.set_password(data["password"])

        session.add(new_user)
        session.commit()

        return {"message": "User created successfully"}, 201
    except SQLAlchemyError as e:
        session.rollback()
        return {"message": "Database error occurred", "error": str(e)}, 500
    finally:
        if session:
            session.close()


@users_routes.route("/register", methods=["POST"])
def register_user():
    if not request.is_json:
        return (
            jsonify(
                {"message": "Request must be JSON", "error": "Unsupported Media Type"}
            ),
            415,
        )

    try:
        data = request.get_json()
        response, status = create_new_user(data)
        return jsonify(response), status
    except Exception as e:
        return jsonify({"message": "An error occurred", "error": str(e)}), 500


def update_existing_user(user_id, data):
    # Implement this function
    pass


def delete_existing_user(user_id):
    # Implement this function
    pass


@users_routes.route("/users", methods=["GET"])
@jwt_required()
def get_all_users():
    try:
        with Session() as session:
            users = session.query(Users).all()
            return jsonify(
                {
                    "message": "All users fetched successfully",
                    "count": len(users),
                    "data": [user.serialize() for user in users],
                }
            )
    except SQLAlchemyError as e:
        return jsonify({"message": "Database error occurred", "error": str(e)}), 500


@users_routes.route("/users/<int:user_id>", methods=["GET"])
@jwt_required()
def get_user(user_id):
    try:
        with Session() as session:
            user = session.query(Users).filter_by(id=user_id).first()
            if user:
                return jsonify(
                    {
                        "message": "User fetched successfully",
                        "data": user.serialize(),
                    }
                )
            else:
                return jsonify({"message": "User not found"}), 404
    except SQLAlchemyError as e:
        return jsonify({"message": "Database error occurred", "error": str(e)}), 500


@users_routes.route("/users", methods=["POST"])
@jwt_required()
def create_user():
    try:
        data = request.get_json()
        response, status = create_new_user(data)
        return jsonify(response), status
    except Exception as e:
        return jsonify({"message": "An error occurred", "error": str(e)}), 500


@users_routes.route("/users/<int:user_id>", methods=["PUT"])
@jwt_required()
def update_user(user_id):
    try:
        data = request.get_json()
        response, status = update_existing_user(user_id, data)
        return jsonify(response), status
    except Exception as e:
        return jsonify({"message": "An error occurred", "error": str(e)}), 500


@users_routes.route("/users/<int:user_id>", methods=["DELETE"])
@jwt_required()
def delete_user(user_id):
    try:
        response, status = delete_existing_user(user_id)
        return jsonify(response), status
    except Exception as e:
        return jsonify({"message": "An error occurred", "error": str(e)}), 500
