from flask import Blueprint, request, jsonify
from connection.connector import connection
from sqlalchemy.orm import sessionmaker
from models.Transactions import Transactions
from models.Promotions import Promotions
from models.Products import Products

from flask_jwt_extended import jwt_required, get_jwt_identity
from decorator import role_required
from sqlalchemy.exc import SQLAlchemyError

transaction_routes = Blueprint("transaction_routes", __name__)
Session = sessionmaker(bind=connection)

# Utility Functions


def create_transaction(user_id):
    session = Session()
    try:
        transaction = Transactions(
            user_id=user_id,
            transaction_number=Transactions.generate_transactions_number(),
            total_price_all_before=0,
            transaction_status="pending",
        )
        session.add(transaction)
        session.commit()
        return transaction.to_dict(), 201
    except SQLAlchemyError as e:
        session.rollback()
        return {"message": "Failed to create transaction", "error": str(e)}, 500
    finally:
        session.close()


def delete_transaction(transaction_id, user_id):
    session = Session()
    try:
        transaction = (
            session.query(Transactions)
            .filter_by(id=transaction_id, user_id=user_id)
            .first()
        )
        if not transaction:
            return {"message": "Transaction not found"}, 404

        session.delete(transaction)
        session.commit()
        return {"message": "Transaction deleted successfully"}, 200
    except SQLAlchemyError as e:
        session.rollback()
        return {"message": "Failed to delete transaction", "error": str(e)}, 500
    finally:
        session.close()


def get_seller_transactions(seller_id, filters):
    session = Session()
    try:
        query = (
            session.query(Transactions)
            .join(Transactions.transaction_details)
            .filter(Transactions.transaction_details.any(Products.user_id == seller_id))
        )

        if filters.get("product_id"):
            query = query.filter(
                Transactions.transaction_details.any(
                    Products.id == filters["product_id"]
                )
            )

        transactions = query.all()
        return [transaction.to_dict() for transaction in transactions], 200
    except SQLAlchemyError as e:
        return {"message": "Failed to retrieve transactions", "error": str(e)}, 500
    finally:
        session.close()


def get_seller_transaction_by_id(transaction_id, seller_id):
    session = Session()
    try:
        transaction = (
            session.query(Transactions)
            .join(Transactions.transaction_details)
            .filter(
                Transactions.id == transaction_id,
                Transactions.transaction_details.any(Products.user_id == seller_id),
            )
            .first()
        )
        if not transaction:
            return {"message": "Transaction not found"}, 404

        return transaction.to_dict(), 200
    except SQLAlchemyError as e:
        return {"message": "Failed to retrieve transaction", "error": str(e)}, 500
    finally:
        session.close()


# Routes


# Buyer: Create Transaction
@transaction_routes.route("/", methods=["POST"])
@jwt_required()
@role_required("buyer")
def create_transaction_route():
    current_user_id = get_jwt_identity()
    response, status = create_transaction(current_user_id)
    return jsonify(response), status


# Buyer: Delete Transaction
@transaction_routes.route("/<int:id>", methods=["DELETE"])
@jwt_required()
@role_required("buyer")
def delete_transaction_route(id):
    current_user_id = get_jwt_identity()
    response, status = delete_transaction(id, current_user_id)
    return jsonify(response), status


# Seller: Get All Transactions
@transaction_routes.route("/", methods=["GET"])
@jwt_required()
@role_required("seller")
def get_seller_transactions_route():
    current_user_id = get_jwt_identity()
    filters = {"product_id": request.args.get("product_id")}
    response, status = get_seller_transactions(current_user_id, filters)
    return jsonify(response), status


# Seller: Get Transaction by ID
@transaction_routes.route("/<int:id>", methods=["GET"])
@jwt_required()
@role_required("seller")
def get_seller_transaction_route(id):
    current_user_id = get_jwt_identity()
    response, status = get_seller_transaction_by_id(id, current_user_id)
    return jsonify(response), status
