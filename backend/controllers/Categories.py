from flask import Blueprint, request, jsonify
from connection.connector import connection
from sqlalchemy.orm import sessionmaker
from models.Categories import Categories

category_routes = Blueprint("category_routes", __name__)


@category_routes.route("/testing", methods=["GET"])
def testing():
    Session = sessionmaker(bind=connection)
    s = Session()
    try:
        category = s.query(Categories).first()
        response = {
            "message": "good connection",
            "dict": category.to_dict() if category else "No categories available",
        }
        status_code = 200
    except Exception as e:
        response = {"message": "connection failed", "error": str(e)}
        status_code = 500
    finally:
        s.close()

    return jsonify(response), status_code


@category_routes.route("/categories", methods=["POST"])
def create_category():
    Session = sessionmaker(bind=connection)
    s = Session()

    s.begin()
    try:
        new_category = Category(name=request.form["name"])
        s.add(new_category)
        s.commit()
    except Exception as e:
        s.rollback()
        return {"message": "Fail to create category", "error": str(e)}, 500

    return {
        "message": "Category created successfully",
        "category": {"id": new_category.id, "name": new_category.name},
    }, 200


@category_routes.route("/categories", methods=["GET"])
def get_categories():
    Session = sessionmaker(bind=connection)
    s = Session()

    try:
        categories = s.query(Category).all()
        category_list = [
            {
                "id": category.id,
                "name": category.name,
                "created_at": category.created_at,
                "updated_at": category.updated_at,
            }
            for category in categories
        ]
    except Exception as e:
        return {"message": "Fail to retrieve categories", "error": str(e)}, 500

    return {"categories": category_list}, 200


@category_routes.route("/categories/<int:category_id>", methods=["GET"])
def get_category(category_id):
    Session = sessionmaker(bind=connection)
    s = Session()

    try:
        category = s.query(Category).filter(Category.id == category_id).first()
        if category is None:
            return {"message": "Category not found"}, 404
    except Exception as e:
        return {"message": "Fail to retrieve category", "error": str(e)}, 500

    return {
        "category": {
            "id": category.id,
            "name": category.name,
            "created_at": category.created_at,
            "updated_at": category.updated_at,
        }
    }, 200


@category_routes.route("/categories/<int:category_id>", methods=["PUT"])
def update_category(category_id):
    Session = sessionmaker(bind=connection)
    s = Session()

    s.begin()
    try:
        category = s.query(Category).filter(Category.id == category_id).first()
        if category is None:
            return {"message": "Category not found"}, 404

        category.name = request.form["name"]
        s.commit()
    except Exception as e:
        s.rollback()
        return {"message": "Fail to update category", "error": str(e)}, 500

    return {
        "message": "Category updated successfully",
        "category": {"id": category.id, "name": category.name},
    }, 200


@category_routes.route("/categories/<int:category_id>", methods=["DELETE"])
def delete_category(category_id):
    Session = sessionmaker(bind=connection)
    s = Session()

    s.begin()
    try:
        category = s.query(Category).filter(Category.id == category_id).first()
        if category is None:
            return {"message": "Category not found"}, 404

        s.delete(category)
        s.commit()
    except Exception as e:
        s.rollback()
        return {"message": "Fail to delete category", "error": str(e)}, 500

    return {"message": "Category deleted successfully"}, 200
