from flask import Blueprint, request, jsonify
from sqlalchemy.exc import IntegrityError
from models.Products import Products
from connection.connector import connection
from sqlalchemy.orm import sessionmaker

Session = sessionmaker(bind=connection)
session = Session()

product_routes = Blueprint("product_routes", __name__)


# UNTUK TESTING UDH BISA MASUK BLM
@product_routes.route("/testing", methods=["GET"])
def testing():
    Session = sessionmaker(bind=connection)
    s = Session()
    try:
        product = s.query(Products).first()
        response = {
            "message": "good connection",
            "dict": product.to_dict() if product else "No products available",
        }
        status_code = 200
    except Exception as e:
        response = {"message": "connection failed", "error": str(e)}
        status_code = 500
    finally:
        s.close()

    return jsonify(response), status_code


@product_routes.route("/", methods=["POST"])
def add_product():
    data = request.get_json()
    new_product = Products(
        user_id=data["user_id"],
        category_id=data["category_id"],
        title=data["title"],
        description=data["description"],
        stock=data["stock"],
        price=data["price"],
    )
    try:
        session.add(new_product)
        session.commit()
        return jsonify({"message": "Product added successfully"}), 201
    except IntegrityError:
        session.rollback()
        return jsonify({"message": "Failed to add product"}), 400


@product_routes.route("/", methods=["GET"])
def get_products():
    category_id = request.args.get("category_id")
    user_id = request.args.get("user_id")

    page = request.args.get("page", 1, type=int)
    per_page = request.args.get("per_page", 10, type=int)

    query = session.query(Products)
    if category_id:
        query = query.filter_by(category_id=category_id)
    if user_id:
        query = query.filter_by(user_id=user_id)

    total = query.count()
    products = query.offset((page - 1) * per_page).limit(per_page).all()

    return jsonify(
        {
            "total": total,
            "page": page,
            "per_page": per_page,
            "products": [product.to_dict() for product in products],
        }
    )


@product_routes.route("/<int:id>", methods=["GET"])
def get_product(id):
    product = session.query(Products).get(id)
    if product:
        return jsonify(product.to_dict())
    else:
        return jsonify({"message": "Product not found"}), 404


@product_routes.route("/<int:id>", methods=["PUT"])
def update_product(id):
    data = request.get_json()
    product = session.query(Products).get(id)
    if product:
        product.category_id = data.get("category_id", product.category_id)
        product.title = data.get("title", product.title)
        product.description = data.get("description", product.description)
        product.stock = data.get("stock", product.stock)
        product.price = data.get("price", product.price)
        try:
            session.commit()
            return jsonify({"message": "Product updated successfully"})
        except IntegrityError:
            session.rollback()
            return jsonify({"message": "Failed to update product"}), 400
    else:
        return jsonify({"message": "Product not found"}), 404


@product_routes.route("/<int:id>", methods=["DELETE"])
def delete_product(id):
    product = session.query(Products).get(id)
    if product:
        session.delete(product)
        session.commit()
        return jsonify({"message": "Product deleted successfully"})
    else:
        return jsonify({"message": "Product not found"}), 404
