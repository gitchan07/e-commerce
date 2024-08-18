from flask import Blueprint, request, jsonify, make_response
from connection.connector import connection
from sqlalchemy.orm import sessionmaker
from models.Users import Users
from models.revoked_token import RevokedToken
from flask_jwt_extended import (
    create_access_token,
    get_jwt_identity,
    jwt_required,
    get_jwt,
)
from sqlalchemy.exc import SQLAlchemyError
from connection.connector import session

users_routes = Blueprint("users_routes", __name__)

# Routes


@users_routes.route("/register", methods=["POST"])
def register_user():
    if not request.is_json:
        return jsonify({"message": "Request must be JSON"}), 415

    try:
        data = request.get_json()
        if not all(key in data for key in ("username", "email", "password", "role")):
            return {"message": "Missing required fields"}, 400

        if (
            session.query(Users).filter_by(username=data["username"]).first()
            or session.query(Users).filter_by(email=data["email"]).first()
        ):
            return {"message": "Username or email already exists"}, 400

        new_user = Users(
            username=data["username"],
            email=data["email"],
            role=data["role"],
            full_name=data.get("full_name", ""),
            address=data.get("address", ""),
        )
        new_user.set_password(data["password"])

        session.add(new_user)
        session.commit()

        return {"message": "User created successfully"}, 201
    except SQLAlchemyError as e:
        session.rollback()
        return {"message": "Database error occurred", "error": str(e)}, 500
    finally:
        session.close()


@users_routes.route("/login", methods=["POST"])
def login_user_route():
    if not request.is_json:
        return jsonify({"message": "Request must be JSON"}), 415

    try:
        data = request.get_json()
        user = session.query(Users).filter_by(username=data["username"]).first()
        if user and user.check_password(data["password"]):
            token = create_access_token(identity=user.id)
            resp = make_response(
                jsonify(
                    {
                        "message": "Login successful",
                        "access_token": token,
                        "user_id": user.id,
                        "role": user.role,
                    }
                ),
                200,
            )
            return resp
        return {"message": "Invalid credentials"}, 401
    except SQLAlchemyError as e:
        return {"message": "Database error occurred", "error": str(e)}, 500
    finally:
        session.close()


@users_routes.route("/", methods=["GET"])
@jwt_required()
def get_all_users_route():
    try:
        users = session.query(Users).all()
        return {
            "message": "All users fetched successfully",
            "count": len(users),
            "data": [user.to_dict() for user in users],
        }, 200
    except SQLAlchemyError as e:
        return {"message": "Database error occurred", "error": str(e)}, 500
    finally:
        session.close()


@users_routes.route("/<int:user_id>", methods=["GET"])
@jwt_required()
def get_user_route(user_id):
    try:
        user = session.query(Users).filter_by(id=user_id).first()
        if user:
            return {
                "message": "User fetched successfully",
                "data": user.to_dict(),
            }, 200
        return {"message": "User not found"}, 404
    except SQLAlchemyError as e:
        return {"message": "Database error occurred", "error": str(e)}, 500
    finally:
        session.close()


@users_routes.route("/<int:user_id>", methods=["PUT"])
@jwt_required()
def update_user_route(user_id):
    try:
        data = request.get_json()
        user = session.query(Users).filter_by(id=user_id).first()

        if not user:
            return {"message": "User not found"}, 404

        if "username" in data:
            user.username = data["username"]
        if "email" in data:
            user.email = data["email"]
        if "full_name" in data:
            user.full_name = data["full_name"]
        if "address" in data:
            user.address = data["address"]
        if "role" in data:
            user.role = data["role"]
        if "password" in data:
            user.set_password(data["password"])

        session.commit()

        return {"message": "User updated successfully"}, 200
    except SQLAlchemyError as e:
        session.rollback()
        return {"message": "Database error occurred", "error": str(e)}, 500
    finally:
        session.close()


@users_routes.route("/<int:user_id>", methods=["DELETE"])
@jwt_required()
def delete_user_route(user_id):
    try:
        user = session.query(Users).filter_by(id=user_id).first()

        if not user:
            return {"message": "User not found"}, 404

        session.delete(user)
        session.commit()

        return {"message": "User deleted successfully"}, 200
    except SQLAlchemyError as e:
        session.rollback()
        return {"message": "Database error occurred", "error": str(e)}, 500
    finally:
        session.close()


@users_routes.route("/protected", methods=["GET"])
@jwt_required()
def protected_route():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200


@users_routes.route("/logout", methods=["POST"])
@jwt_required()
def logout_route():
    jti = get_jwt()["jti"]
    try:
        revoked_token = RevokedToken(jti=jti)
        session.add(revoked_token)
        session.commit()
        return jsonify(msg="Access token revoked")
    except SQLAlchemyError as e:
        session.rollback()
        return {"message": "Database error occurred", "error": str(e)}, 500
    finally:
        session.close()


def get_blocklist(jti):
    try:
        blocklist = session.query(RevokedToken).filter_by(jti=jti).first()
        return blocklist is not None
    except SQLAlchemyError as e:
        session.rollback()
        return {"message": "Database error occurred", "error": str(e)}, 500
    finally:
        session.close()
