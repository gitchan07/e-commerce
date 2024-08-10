from flask import Blueprint, request, jsonify
from connection.connector import connection
from sqlalchemy.orm import sessionmaker
from models.TransactionDetails import TransactionDetails
from models.Transactions import Transactions
from models.Products import Products
from flask_jwt_extended import jwt_required, get_jwt_identity
from decorator import role_required
from sqlalchemy.exc import SQLAlchemyError

transaction_details_routes = Blueprint("transaction_details_routes", __name__)
Session = sessionmaker(bind=connection)

# Utility Functions


def add_or_update_transaction_detail(transaction_id, product_id, quantity):
    session = Session()
    try:
        # Check if the transaction and product exist
        transaction = session.query(Transactions).filter_by(id=transaction_id).first()
        product = session.query(Products).filter_by(id=product_id).first()

        if not transaction or not product:
            return {"message": "Transaction or Product not found"}, 404

        # Check if this product is already in the transaction
        transaction_detail = (
            session.query(TransactionDetails)
            .filter_by(transaction_id=transaction_id, product_id=product_id)
            .first()
        )

        if transaction_detail:
            # Update the quantity
            transaction_detail.quantity += quantity
            transaction_detail.total_price_item = (
                transaction_detail.quantity * transaction_detail.price
            )
        else:
            # Add a new transaction detail
            transaction_detail = TransactionDetails(
                transaction_id=transaction_id,
                product_id=product_id,
                quantity=quantity,
                price=product.price,
                total_price_item=quantity * product.price,
            )
            session.add(transaction_detail)

        # Update the total price in the transaction
        transaction.total_price_all_before += transaction_detail.total_price_item
        session.commit()

        return transaction_detail.to_dict(), 200
    except SQLAlchemyError as e:
        session.rollback()
        return {
            "message": "Failed to add or update item in transaction",
            "error": str(e),
        }, 500
    finally:
        session.close()


def remove_transaction_detail(transaction_details_id):
    session = Session()
    try:
        # Fetch the existing transaction detail
        transaction_detail = (
            session.query(TransactionDetails)
            .filter_by(id=transaction_details_id)
            .first()
        )

        if not transaction_detail:
            return {"message": "Transaction detail not found"}, 404

        # Adjust the total price in the transaction
        transaction = transaction_detail.transactions
        transaction.total_price_all_before -= transaction_detail.total_price_item

        # Remove the transaction detail
        session.delete(transaction_detail)
        session.commit()

        return {"message": "Transaction detail removed successfully"}, 200
    except SQLAlchemyError as e:
        session.rollback()
        return {"message": "Failed to remove transaction detail", "error": str(e)}, 500
    finally:
        session.close()


def get_seller_transaction_details(seller_id):
    session = Session()
    try:
        # Retrieve transaction details for the seller's products
        transaction_details = (
            session.query(TransactionDetails)
            .join(Products)
            .filter(Products.user_id == seller_id)
            .all()
        )

        if not transaction_details:
            return {"message": "No transactions found for seller's products"}, 404

        result = []
        for detail in transaction_details:
            result.append(
                {
                    "transaction_id": detail.transaction_id,
                    "product_id": detail.product_id,
                    "product_title": detail.products.title,
                    "quantity": detail.quantity,
                    "price_at_purchase": detail.price,
                    "total_price_item": detail.total_price_item,
                    "transaction_status": detail.transactions.transaction_status,
                    "transaction_number": detail.transactions.transaction_number,
                    "datetime": detail.transactions.datetime.isoformat(),
                }
            )

        return result, 200
    except SQLAlchemyError as e:
        return {"message": "Failed to retrieve transactions", "error": str(e)}, 500
    finally:
        session.close()


# Routes


# Add or Update Item in Transaction
@transaction_details_routes.route("/<int:transaction_id>/details/add", methods=["POST"])
@jwt_required()
@role_required("buyer")
def add_or_update_item_in_transaction(transaction_id):
    data = request.get_json()
    if not data or "product_id" not in data or "quantity" not in data:
        return jsonify({"message": "Invalid input"}), 400

    product_id = data["product_id"]
    quantity = data["quantity"]
    response, status = add_or_update_transaction_detail(
        transaction_id, product_id, quantity
    )
    return jsonify(response), status


@transaction_details_routes.route(
    "/<int:transaction_id}/details/<int:transaction_details_id>",
    methods=["DELETE"],
)
@jwt_required()
@role_required("buyer")
def remove_item_from_transaction(transaction_id, transaction_details_id):
    response, status = remove_transaction_detail(transaction_details_id)
    return jsonify(response), status


# Get Seller's Transaction Details
@transaction_details_routes.route("/seller", methods=["GET"])
@jwt_required()
@role_required("seller")
def get_seller_transactions():
    current_user_id = get_jwt_identity()
    response, status = get_seller_transaction_details(current_user_id)
    return jsonify(response), status
