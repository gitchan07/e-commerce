from flask import Blueprint, request, jsonify
from connection.connector import connection
from sqlalchemy.orm import sessionmaker
from models.Categories import Categories
from flask_jwt_extended import jwt_required, get_jwt_identity
from sqlalchemy.exc import SQLAlchemyError
from decorator import role_required
from connection.connector import session

category_routes = Blueprint("category_routes", __name__)


# Routes


@category_routes.route("/", methods=["POST"])
@jwt_required()
@role_required("seller")
def create_category():

    if not request.is_json:
        return jsonify({"message": "Request must be JSON"}), 415

    try:
        data = request.get_json()
        response, status = create_new_category(data)
        return jsonify(response), status
    except Exception as e:
        return jsonify({"message": "An error occurred", "error": str(e)}), 500


@category_routes.route("/", methods=["GET"])
@jwt_required()
def get_categories():
    try:
        response, status = get_all_categories()
        return jsonify(response), status
    except Exception as e:
        return jsonify({"message": "An error occurred", "error": str(e)}), 500


@category_routes.route("/<int:category_id>", methods=["GET"])
@jwt_required()
def get_category(category_id):
    try:
        response, status = get_category_by_id(category_id)
        return jsonify(response), status
    except Exception as e:
        return jsonify({"message": "An error occurred", "error": str(e)}), 500


@category_routes.route("/<int:category_id>", methods=["PUT"])
@jwt_required()
@role_required("seller")
def update_category(category_id):

    if not request.is_json:
        return jsonify({"message": "Request must be JSON"}), 415

    try:
        data = request.get_json()
        response, status = update_existing_category(category_id, data)
        return jsonify(response), status
    except Exception as e:
        return jsonify({"message": "An error occurred", "error": str(e)}), 500


@category_routes.route("/<int:category_id>", methods=["DELETE"])
@jwt_required()
@role_required("seller")
def delete_category(category_id):
    try:
        response, status = delete_existing_category(category_id)
        return jsonify(response), status
    except Exception as e:
        return jsonify({"message": "An error occurred", "error": str(e)}), 500


# Utility Functions


def create_new_category(data):
    try:
        new_category = Categories(name=data["name"])
        session.add(new_category)
        session.commit()
        return {
            "message": "Category created successfully",
            "category": {"id": new_category.id, "name": new_category.name},
        }, 201
    except SQLAlchemyError as e:
        session.rollback()
        return {"message": "Fail to create category", "error": str(e)}, 500
    finally:
        session.close()


def get_all_categories():
    try:
        categories = session.query(Categories).all()
        category_list = [
            {
                "id": category.id,
                "name": category.name,
                "created_at": category.created_at,
                "updated_at": category.updated_at,
            }
            for category in categories
        ]
        return {"categories": category_list}, 200
    except SQLAlchemyError as e:
        return {"message": "Fail to retrieve categories", "error": str(e)}, 500
    finally:
        session.close()


def get_category_by_id(category_id):
    try:
        category = session.query(Categories).filter_by(id=category_id).first()
        if category is None:
            return {"message": "Category not found"}, 404
        return {
            "category": {
                "id": category.id,
                "name": category.name,
                "created_at": category.created_at,
                "updated_at": category.updated_at,
            }
        }, 200
    except SQLAlchemyError as e:
        return {"message": "Fail to retrieve category", "error": str(e)}, 500
    finally:
        session.close()


def update_existing_category(category_id, data):
    try:
        category = session.query(Categories).filter_by(id=category_id).first()
        if category is None:
            return {"message": "Category not found"}, 404
        category.name = data["name"]
        session.commit()
        return {
            "message": "Category updated successfully",
            "category": {"id": category.id, "name": category.name},
        }, 200
    except SQLAlchemyError as e:
        session.rollback()
        return {"message": "Fail to update category", "error": str(e)}, 500
    finally:
        session.close()


def delete_existing_category(category_id):
    try:
        category = session.query(Categories).filter_by(id=category_id).first()
        if category is None:
            return {"message": "Category not found"}, 404
        session.delete(category)
        session.commit()
        return {"message": "Category deleted successfully"}, 200
    except SQLAlchemyError as e:
        session.rollback()
        return {"message": "Fail to delete category", "error": str(e)}, 500
    finally:
        session.close()
