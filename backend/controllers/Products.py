from flask import Blueprint, request, jsonify, current_app, send_from_directory
from sqlalchemy.exc import IntegrityError, SQLAlchemyError
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.Products import Products
from models.Categories import Categories
from connection.connector import session
from decorator import role_required
import os
from dotenv import load_dotenv

product_routes = Blueprint("product_routes", __name__)
load_dotenv()

# Routes


@product_routes.route("/", methods=["POST"])
@jwt_required()
@role_required("seller")
def add_product():
    current_user_id = get_jwt_identity()

    if request.is_json:
        data = request.get_json()
        img_path = data.get("img_path")
    else:
        data = request.form.to_dict()
        image = request.files.get("image")
        img_path = save_image(image) if image else None

    data["img_path"] = img_path

    try:
        new_product = Products(
            user_id=current_user_id,
            category_id=data["category_id"],
            title=data["title"],
            description=data.get("description", ""),
            stock=data["stock"],
            price=data["price"],
            is_active=data.get("is_active", True),
            img_path=data.get("img_path", ""),
        )
        session.add(new_product)
        session.commit()
        return (
            jsonify(
                {
                    "message": "Product added successfully",
                    "items": new_product.to_dict(),
                }
            ),
            201,
        )
    except IntegrityError:
        session.rollback()
        return (
            jsonify(
                {"message": "Failed to add product because category doesn't exist"}
            ),
            400,
        )
    finally:
        session.close()


@product_routes.route("/", methods=["GET"])
def get_products():
    filters = {
        "category_id": request.args.get("category_id"),
        "title": request.args.get("title"),
        "user_id": request.args.get("user_id"),
        "id": request.args.get("id"),
        "page": request.args.get("page", 1, type=int),
        "per_page": request.args.get("per_page", 10, type=int),
    }

    try:
        query = session.query(Products).filter_by(is_active=True)
        if filters.get("category_id"):
            query = query.filter_by(category_id=filters["category_id"])
        if filters.get("title"):
            query = query.filter(Products.title.ilike(f"%{filters['title']}%"))
        if filters.get("user_id"):
            query = query.filter_by(user_id=filters["user_id"])
        if filters.get("id"):
            query = query.filter_by(id=filters["id"])

        page = filters.get("page", 1)
        per_page = filters.get("per_page", 10)
        total = query.count()
        products = query.offset((page - 1) * per_page).limit(per_page).all()

        return (
            jsonify(
                {
                    "total": total,
                    "page": page,
                    "per_page": per_page,
                    "products": [product.to_dict() for product in products],
                }
            ),
            200,
        )
    except Exception as e:
        session.rollback()
        return jsonify({"message": "Failed to retrieve products", "error": str(e)}), 500


@product_routes.route("/<int:id>", methods=["GET"])
def get_product(id):
    try:
        product = session.query(Products).get(id)
        if product:
            return jsonify(product.to_dict()), 200
        else:
            return jsonify({"message": "Product not found"}), 404
    except Exception as e:
        return jsonify({"message": "An error occurred", "error": str(e)}), 500
    finally:
        session.close()


@product_routes.route("/<int:id>", methods=["PUT"])
@jwt_required()
@role_required("seller")
def update_product(id):
    current_user_id = get_jwt_identity()
    data = request.form.to_dict()
    image = request.files.get("image")

    if image:
        img_path = save_image(image)
        data["img_path"] = img_path

    try:
        product = session.query(Products).get(id)

        if product and product.user_id == current_user_id:
            product.category_id = data.get("category_id", product.category_id)
            product.title = data.get("title", product.title)
            product.description = data.get("description", product.description)
            product.stock = data.get("stock", product.stock)
            product.price = data.get("price", product.price)
            product.is_active = True if data.get("is_active", product.is_active) == "true" else False 
            product.img_path = data.get("img_path", product.img_path)

            session.commit()
            return jsonify({"message": "Product updated successfully"}), 200
        else:
            return jsonify({"message": "Product not found or unauthorized"}), 404
    except IntegrityError:
        session.rollback()
        return jsonify({"message": "Failed to update product"}), 400
    finally:
        session.close()


@product_routes.route("/<int:id>", methods=["DELETE"])
@jwt_required()
@role_required("seller")
def delete_product(id):
    current_user_id = get_jwt_identity()
    try:
        product = session.query(Products).get(id)

        if product and product.user_id == current_user_id:
            session.delete(product)
            session.commit()
            return jsonify({"message": "Product deleted successfully"}), 200
        else:
            return jsonify({"message": "Product not found or unauthorized"}), 404
    except SQLAlchemyError as e:
        session.rollback()
        return jsonify({"message": "Failed to delete product", "error": str(e)}), 500
    finally:
        session.close()


@product_routes.route("/my-products", methods=["GET"])
@jwt_required()
@role_required("seller")
def get_seller_products():
    current_user_id = get_jwt_identity()
    filters = {
        "user_id": current_user_id,
        "category_id": request.args.get("category_id"),
        "title": request.args.get("title"),
        "page": request.args.get("page", 1, type=int),
        "per_page": request.args.get("per_page", 10, type=int),
    }

    try:
        query = session.query(Products).filter_by(user_id=current_user_id)
        if filters.get("category_id"):
            query = query.filter_by(category_id=filters["category_id"])
        if filters.get("title"):
            query = query.filter(Products.title.ilike(f"%{filters['title']}%"))

        page = filters.get("page", 1)
        per_page = filters.get("per_page", 10)
        total = query.count()
        products = query.offset((page - 1) * per_page).limit(per_page).all()

        return (
            jsonify(
                {
                    "total": total,
                    "page": page,
                    "per_page": per_page,
                    "products": [product.to_dict() for product in products],
                    # category
                }
            ),
            200,
        )
    except Exception as e:
        session.rollback()
        return jsonify({"message": "Failed to retrieve products", "error": str(e)}), 500


@product_routes.route("/my-products/<int:id>", methods=["GET"])
@jwt_required()
@role_required("seller")
def get_seller_product_by_id(id):
    current_user_id = get_jwt_identity()
    try:
        product = (
            session.query(Products).filter_by(id=id, user_id=current_user_id).first()
        )
        if product:
            return jsonify(product.to_dict()), 200
        else:
            return jsonify({"message": "Product not found"}), 404
    finally:
        session.close()


# Image retrieval route
@product_routes.route("/image/<path:filename>", methods=["GET"])
def get_image(filename):
    try:
        directory, image_name = os.path.split(filename)
        image_dir = os.path.join(current_app.root_path, directory)

        if not os.path.exists(os.path.join(image_dir, image_name)):
            raise FileNotFoundError("Image not found")

        return send_from_directory(image_dir, image_name)
    except Exception as e:
        return jsonify({"message": "Failed to retrieve image", "error": str(e)}), 404


def save_image(image):
    if image:
        storage_url = os.getenv("STORAGE")
        upload_folder = os.getenv("UPLOAD_FOLDER", "static/upload_image")
        if not os.path.exists(upload_folder):
            os.makedirs(upload_folder)

        image_filename = image.filename
        image_path = os.path.join(upload_folder, image_filename)
        image.save(image_path)

        return f"{image_filename}"
    return None
