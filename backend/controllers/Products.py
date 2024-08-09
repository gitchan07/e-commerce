# tambah upload image
#  http://127.0.0.1:5000/static/upload_image/bg.jpg, munculin ini sudah bisa


from flask import Blueprint, request, jsonify
from sqlalchemy.exc import IntegrityError
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.Products import Products
from models.Users import Users
from connection.connector import connection
from sqlalchemy.orm import sessionmaker

Session = sessionmaker(bind=connection)

product_routes = Blueprint("product_routes", __name__)


# Routes


@product_routes.route("/testing", methods=["GET"])
def test_connection():
    session = Session()
    try:
        products = session.query(Products).all()

        products_list = [product.to_dict() for product in products]

        response = {
            "message": "good connection",
            "products": products_list if products_list else "No products available",
        }
        return jsonify(response), 200
    except Exception as e:
        return jsonify({"message": "connection failed", "error": str(e)}), 500
    finally:
        session.close()


@product_routes.route("/", methods=["POST"])
@jwt_required()
def add_product():
    current_user_id = get_jwt_identity()
    role = get_user_role(current_user_id)

    if role != "seller":
        return jsonify({"message": "Unauthorized"}), 403

    data = request.get_json()
    response, status = create_new_product(data, current_user_id)
    return jsonify(response), status


@product_routes.route("/", methods=["GET"])
@jwt_required()
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
@jwt_required()
def get_product(id):
    response, status = get_product_by_id(id)
    return jsonify(response), status


@product_routes.route("/<int:id>", methods=["PUT"])
@jwt_required()
def update_product(id):
    current_user_id = get_jwt_identity()
    role = get_user_role(current_user_id)

    if role != "seller":
        return jsonify({"message": "Unauthorized"}), 403

    data = request.get_json()
    response, status = update_existing_product(id, data, current_user_id)
    return jsonify(response), status


@product_routes.route("/<int:id>", methods=["DELETE"])
@jwt_required()
def delete_product(id):
    current_user_id = get_jwt_identity()
    role = get_user_role(current_user_id)

    if role != "seller":
        return jsonify({"message": "Unauthorized"}), 403

    response, status = delete_existing_product(id, current_user_id)
    return jsonify(response), status


# Get Seller's Products by Name and Category
@product_routes.route("/my-products", methods=["GET"])
@jwt_required()
def get_seller_products():
    current_user_id = get_jwt_identity()
    role = get_user_role(current_user_id)

    if role != "seller":
        return jsonify({"message": "Unauthorized"}), 403

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
def get_seller_product_by_id(id):
    current_user_id = get_jwt_identity()
    role = get_user_role(current_user_id)

    if role != "seller":
        return jsonify({"message": "Unauthorized"}), 403

    product = session.query(Products).filter_by(id=id, user_id=current_user_id).first()
    if product:
        return jsonify(product.to_dict()), 200
    else:
        return jsonify({"message": "Product not found"}), 404


# Utility Functions
def get_user_role(user_id):
    session = Session()
    try:
        user = session.query(Users).filter_by(id=user_id).first()
        return user.role if user else None
    except Exception as e:
        return {"message": "Database error occurred", "error": str(e)}
    finally:
        session.close()


def create_new_product(data, user_id):
    session = Session()
    try:
        new_product = Products(
            user_id=user_id,
            category_id=data["category_id"],
            title=data["title"],
            description=data.get("description", ""),
            stock=data["stock"],
            price=data["price"],
        )
        session.add(new_product)
        session.commit()
        return {"message": "Product added successfully"}, 201
    except IntegrityError:
        session.rollback()
        return {"message": "Failed to add product"}, 400
    finally:
        session.close()


def get_all_products(filters):
    session = Session()
    query = session.query(Products)
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


def get_product_by_id(product_id):
    session = Session()
    product = session.query(Products).get(product_id)
    if product:
        return product.to_dict(), 200
    else:
        return {"message": "Product not found"}, 404


def update_existing_product(product_id, data, user_id):
    session = Session()
    try:
        product = session.query(Products).get(product_id)

        if product and product.user_id == user_id:
            product.category_id = data.get("category_id", product.category_id)
            product.title = data.get("title", product.title)
            product.description = data.get("description", product.description)
            product.stock = data.get("stock", product.stock)
            product.price = data.get("price", product.price)

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
    session = Session()
    try:
        product = session.query(Products).get(product_id)

        if product and product.user_id == user_id:
            session.delete(product)
            session.commit()
            return {"message": "Product deleted successfully"}, 200
        else:
            return {"message": "Product not found or unauthorized"}, 404
    finally:
        session.close()
