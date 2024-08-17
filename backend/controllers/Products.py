from flask import Blueprint, request, jsonify, current_app
from sqlalchemy.exc import IntegrityError
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.Products import Products
from models.Users import Users
from connection.connector import connection
from sqlalchemy.orm import sessionmaker
from sqlalchemy.exc import SQLAlchemyError
from decorator import role_required
import os
from sqlalchemy.exc import OperationalError, SQLAlchemyError
from sqlalchemy.orm import Session
from connection.connector import session
from flask import send_from_directory, current_app
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
    response, status = create_new_product(data, current_user_id)
    return jsonify(response), status


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

    response, status = get_all_products(filters)
    return jsonify(response), status


@product_routes.route("/<int:id>", methods=["GET"])
def get_product(id):
    response, status = get_product_by_id(id)
    return jsonify(response), status


@product_routes.route("/<int:id>", methods=["PUT"])
@jwt_required()
@role_required("seller")
def update_product(id):
    current_user_id = get_jwt_identity()
    data = request.form.to_dict()
    image = request.files.get("image")  # Image file from form data

    # Save the image and get the path if an image was uploaded
    if image:
        img_path = save_image(image)
        data["img_path"] = img_path

    response, status = update_existing_product(id, data, current_user_id)
    return jsonify(response), status


@product_routes.route("/<int:id>", methods=["DELETE"])
@jwt_required()
@role_required("seller")
def delete_product(id):
    current_user_id = get_jwt_identity()
    response, status = delete_existing_product(id, current_user_id)
    return jsonify(response), status


# Get Seller's Products by Name and Category
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

    response, status = get_all_products(filters)
    return jsonify(response), status


# Get a Specific Product for Seller by ID
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


# Utility Functions


# Utility function for saving the uploaded image
def save_image(image):
    if image:
        storage_url = os.getenv("STORAGE")
        upload_folder = os.getenv("UPLOAD_FOLDER", "static/upload_image")
        # Ensure the upload folder exists
        if not os.path.exists(upload_folder):
            os.makedirs(upload_folder)

        # Create a unique filename
        image_filename = image.filename
        image_path = os.path.join(upload_folder, image_filename)
        image.save(image_path)

        # Return the relative path to store in the database
        return f"{upload_folder}/{image_filename}"
    return None


def create_new_product(data, user_id):
    try:
        new_product = Products(
            user_id=user_id,
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
        return {
            "message": "Product added successfully",
            "items": new_product.to_dict(),
        }, 201
    except IntegrityError:
        session.rollback()
        return {"message": "Failed to add product because category doesnt exist"}, 400
    finally:
        session.close()


def get_all_products(filters):

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

        return {
            "total": total,
            "page": page,
            "per_page": per_page,
            "products": [product.to_dict() for product in products],
        }, 200
    except Exception as e:
        session.rollback()
        return {"message": "Failed to retrieve products", "error": str(e)}, 500


def get_product_by_id(product_id):
    try:
        product = session.query(Products).get(product_id)
        if product:
            return product.to_dict(), 200
        else:
            return {"message": "Product not found"}, 404
    except Exception as e:
        return {"message": "An error occurred", "error": str(e)}, 500
    finally:
        session.close()


def update_existing_product(product_id, data, user_id):
    try:
        product = session.query(Products).get(product_id)

        if product and product.user_id == user_id:
            product.category_id = data.get("category_id", product.category_id)
            product.title = data.get("title", product.title)
            product.description = data.get("description", product.description)
            product.stock = data.get("stock", product.stock)
            product.price = data.get("price", product.price)
            product.is_active = data.get("is_active", product.is_active)
            product.img_path = data.get("img_path", product.img_path)

            session.commit()
            return {"message": "Product updated successfully"}, 200
        else:
            return {"message": "Product not found or unauthorized"}, 404
    except IntegrityError:
        session.rollback()
        return {"message": "Failed to update product"}, 400
    finally:
        session.close()


def delete_existing_product(product_id, user_id):
    try:
        product = session.query(Products).get(product_id)

        if product and product.user_id == user_id:
            session.delete(product)
            session.commit()
            return {"message": "Product deleted successfully"}, 200
        else:
            return {"message": "Product not found or unauthorized"}, 404
    except SQLAlchemyError as e:
        session.rollback()
        return {"message": "Failed to delete product", "error": str(e)}, 500
    finally:
        session.close()


def get_image(file_name):
    try:
        # Split the file_name to get the directory and file separately
        directory, image_name = os.path.split(file_name)
        image_dir = os.path.join(current_app.root_path, directory)

        # Check if the file exists
        if not os.path.exists(os.path.join(image_dir, image_name)):
            raise FileNotFoundError("Image not found")

        # Serve the image file
        return send_from_directory(image_dir, image_name)

    except Exception as e:
        return {"message": "Failed to retrieve image", "error": str(e)}, 404
