from flask import Blueprint, request, jsonify
from connection.connector import connection
from sqlalchemy.orm import sessionmaker
from models.TransactionDetails import TransactionDetails
from models.Products import Products
from models.Transactions import Transactions
from flask_jwt_extended import jwt_required, get_jwt_identity
from decorator import role_required
from sqlalchemy.exc import SQLAlchemyError

transaction_details_routes = Blueprint("transaction_details_routes", __name__)
Session = sessionmaker(bind=connection)

# Utility Functions


def add_transaction_detail(transaction_id, product_id, quantity):
    session = Session()
    try:
        product = session.query(Products).filter_by(id=product_id).first()
        if not product:
            return {"message": "Product not found"}, 404

        transaction = session.query(Transactions).filter_by(id=transaction_id).first()
        if not transaction:
            return {"message": "Transaction not found"}, 404

        transaction_detail = TransactionDetails(
            transaction_id=transaction_id,
            product_id=product_id,
            quantity=quantity,
            price=product.price,
            total_price_item=product.price * quantity,
        )
        session.add(transaction_detail)

        # Update the total price of the transaction
        transaction.total_price_all_before += transaction_detail.total_price_item
        session.commit()

        return transaction_detail.to_dict(), 201
    except SQLAlchemyError as e:
        session.rollback()
        return {"message": "Failed to add transaction detail", "error": str(e)}, 500
    finally:
        session.close()


def get_transaction_detail(transaction_id, detail_id, user_id):
    session = Session()
    try:
        detail = (
            session.query(TransactionDetails)
            .filter_by(id=detail_id, transaction_id=transaction_id)
            .first()
        )
        if not detail or detail.transactions.user_id != user_id:
            return {"message": "Transaction detail not found or unauthorized"}, 404

        return detail.to_dict(), 200
    except SQLAlchemyError as e:
        return {
            "message": "Failed to retrieve transaction detail",
            "error": str(e),
        }, 500
    finally:
        session.close()


def update_transaction_detail(transaction_id, detail_id, quantity, price):
    session = Session()
    try:
        detail = (
            session.query(TransactionDetails)
            .filter_by(id=detail_id, transaction_id=transaction_id)
            .first()
        )
        if not detail:
            return {"message": "Transaction detail not found"}, 404

        # Update the detail
        detail.quantity = quantity
        detail.price = price
        detail.total_price_item = quantity * price

        # Update the total price of the transaction
        transaction = detail.transactions
        transaction.total_price_all_before = sum(
            [d.total_price_item for d in transaction.transaction_details]
        )

        session.commit()
        return detail.to_dict(), 200
    except SQLAlchemyError as e:
        session.rollback()
        return {"message": "Failed to update transaction detail", "error": str(e)}, 500
    finally:
        session.close()


def delete_transaction_detail(transaction_id, detail_id):
    session = Session()
    try:
        detail = (
            session.query(TransactionDetails)
            .filter_by(id=detail_id, transaction_id=transaction_id)
            .first()
        )
        if not detail:
            return {"message": "Transaction detail not found"}, 404

        # Update the total price of the transaction
        transaction = detail.transactions
        transaction.total_price_all_before -= detail.total_price_item

        # Delete the detail
        session.delete(detail)
        session.commit()

        return {"message": "Transaction detail deleted successfully"}, 200
    except SQLAlchemyError as e:
        session.rollback()
        return {"message": "Failed to delete transaction detail", "error": str(e)}, 500
    finally:
        session.close()


# Routes


# Buyer: Add Transaction Detail
@transaction_details_routes.route("/<int:transaction_id>/details", methods=["POST"])
@jwt_required()
@role_required("buyer")
def add_transaction_detail_route(transaction_id):
    data = request.get_json()
    product_id = data.get("product_id")
    quantity = data.get("quantity", 1)

    response, status = add_transaction_detail(transaction_id, product_id, quantity)
    return jsonify(response), status


# Buyer: Get Transaction Detail
@transaction_details_routes.route(
    "/<int:transaction_id>/details/<int:detail_id>", methods=["GET"]
)
@jwt_required()
@role_required("buyer")
def get_transaction_detail_route(transaction_id, detail_id):
    current_user_id = get_jwt_identity()
    response, status = get_transaction_detail(
        transaction_id, detail_id, current_user_id
    )
    return jsonify(response), status


# Buyer: Update Transaction Detail
@transaction_details_routes.route(
    "/<int:transaction_id>/details/<int:detail_id>", methods=["PUT"]
)
@jwt_required()
@role_required("buyer")
def update_transaction_detail_route(transaction_id, detail_id):
    data = request.get_json()
    quantity = data.get("quantity")
    price = data.get("price")

    response, status = update_transaction_detail(
        transaction_id, detail_id, quantity, price
    )
    return jsonify(response), status


# Buyer: Delete Transaction Detail
@transaction_details_routes.route(
    "/<int:transaction_id>/details/<int:detail_id>", methods=["DELETE"]
)
@jwt_required()
@role_required("buyer")
def delete_transaction_detail_route(transaction_id, detail_id):
    response, status = delete_transaction_detail(transaction_id, detail_id)
    return jsonify(response), status
