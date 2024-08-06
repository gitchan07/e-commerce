from flask import Blueprint, request, jsonify
from sqlalchemy.exc import IntegrityError
from models.Products import Product
from connection.connector import connection
from sqlalchemy.orm import sessionmaker

Session = sessionmaker(bind=connection)
session = Session()

product_management_bp = Blueprint("product_management", __name__)


@product_management_bp.route("/", methods=["POST"])
def add_product():
    data = request.get_json()
    new_product = Product(
        user_id=data["user_id"],
        category_id=data["category_id"],
        title=data["title"],
        description=data["description"],
        stock=data["stock"],
        price=data["price"],
        promotion=data["promotion"],
    )
    try:
        session.add(new_product)
        session.commit()
        return jsonify({"message": "Product added successfully"}), 201
    except IntegrityError:
        session.rollback()
        return jsonify({"message": "Failed to add product"}), 400


@product_management_bp.route("/", methods=["GET"])
def get_products():
    category_id = request.args.get("category_id")
    user_id = request.args.get("user_id")

    query = session.query(Product)
    if category_id:
        query = query.filter_by(category_id=category_id)
    if user_id:
        query = query.filter_by(user_id=user_id)

    products = query.all()
    return jsonify([product.to_dict() for product in products])


@product_management_bp.route("/<int:id>", methods=["GET"])
def get_product(id):
    product = session.query(Product).get(id)
    if product:
        return jsonify(product.to_dict())
    else:
        return jsonify({"message": "Product not found"}), 404


@product_management_bp.route("/<int:id>", methods=["PUT"])
def update_product(id):
    data = request.get_json()
    product = session.query(Product).get(id)
    if product:
        product.category_id = data.get("category_id", product.category_id)
        product.title = data.get("title", product.title)
        product.description = data.get("description", product.description)
        product.stock = data.get("stock", product.stock)
        product.price = data.get("price", product.price)
        product.promotion = data.get("promotion", product.promotion)
        try:
            session.commit()
            return jsonify({"message": "Product updated successfully"})
        except IntegrityError:
            session.rollback()
            return jsonify({"message": "Failed to update product"}), 400
    else:
        return jsonify({"message": "Product not found"}), 404


@product_management_bp.route("/<int:id>", methods=["DELETE"])
def delete_product(id):
    product = session.query(Product).get(id)
    if product:
        session.delete(product)
        session.commit()
        return jsonify({"message": "Product deleted successfully"})
    else:
        return jsonify({"message": "Product not found"}), 404
