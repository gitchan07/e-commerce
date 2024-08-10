from flask import Blueprint, request, jsonify
from connection.connector import connection
from sqlalchemy.orm import sessionmaker
from models.Transactions import Transactions
from models.Promotions import Promotions
from models.TransactionDetails import TransactionDetails
from flask_jwt_extended import jwt_required, get_jwt_identity
from decorator import role_required
from sqlalchemy.exc import SQLAlchemyError

transaction_routes = Blueprint("transaction_routes", __name__)
Session = sessionmaker(bind=connection)

# Utility Functions


def get_or_create_transaction(user_id):
    session = Session()
    try:
        # Check if an open transaction exists for this user
        transaction = (
            session.query(Transactions)
            .filter_by(user_id=user_id, transaction_status="pending")
            .first()
        )

        # If no pending transaction exists, create a new one
        if not transaction:
            transaction = Transactions(
                user_id=user_id,
                transaction_number=Transactions.generate_transactions_number(),
                total_price_all_before=0,
                transaction_status="pending",
            )
            session.add(transaction)
            session.commit()

        return transaction, 200
    except SQLAlchemyError as e:
        session.rollback()
        return {"message": "Failed to get or create transaction", "error": str(e)}, 500
    finally:
        session.close()


def apply_promotion_to_transaction(transaction, promotion_code):
    session = Session()
    try:
        # Fetch the promotion
        promotion = (
            session.query(Promotions).filter_by(voucher_code=promotion_code).first()
        )

        if not promotion:
            return {"message": "Promotion not found"}, 404

        # Apply the promotion to the transaction
        transaction.promotion_id = promotion.id
        transaction.total_price_all_after = transaction.apply_promotions()
        session.commit()

        return {
            "message": "Promotion applied successfully",
            "total_price_all_after": transaction.total_price_all_after,
        }, 200
    except SQLAlchemyError as e:
        session.rollback()
        return {"message": "Failed to apply promotion", "error": str(e)}, 500
    finally:
        session.close()


def update_transaction_status(transaction, status):
    session = Session()
    try:
        # Update the transaction status
        transaction.transaction_status = status
        session.commit()

        # If status is 'paid', reduce the product quantities
        if status == "paid":
            for detail in transaction.transaction_details:
                product = detail.products
                product.stock -= detail.quantity
                session.commit()

        return {"message": "Transaction status updated to {}".format(status)}, 200
    except SQLAlchemyError as e:
        session.rollback()
        return {"message": "Failed to update transaction status", "error": str(e)}, 500
    finally:
        session.close()


# Routes


# Get or Create Transaction
@transaction_routes.route("/", methods=["GET"])
@jwt_required()
@role_required("buyer")
def get_or_create_transaction_route():
    current_user_id = get_jwt_identity()
    response, status = get_or_create_transaction(current_user_id)
    return (
        jsonify(response.to_dict() if isinstance(response, Transactions) else response),
        status,
    )


# Apply Promotion
@transaction_routes.route("/<int:transaction_id>/apply-promotion", methods=["POST"])
@jwt_required()
@role_required("buyer")
def apply_promotion(transaction_id):
    data = request.get_json()
    promotion_code = data.get("promotion_code")

    session = Session()
    try:
        transaction = session.query(Transactions).filter_by(id=transaction_id).first()
        if not transaction:
            return jsonify({"message": "Transaction not found"}), 404

        response, status = apply_promotion_to_transaction(transaction, promotion_code)
        return jsonify(response), status
    finally:
        session.close()


# Update Transaction Status
@transaction_routes.route("/<int:transaction_id>/status", methods=["PUT"])
@jwt_required()
@role_required("buyer")
def update_transaction_status_route(transaction_id):
    data = request.get_json()
    status = data.get("status")

    session = Session()
    try:
        transaction = session.query(Transactions).filter_by(id=transaction_id).first()
        if not transaction:
            return jsonify({"message": "Transaction not found"}), 404

        response, status = update_transaction_status(transaction, status)
        return jsonify(response), status
    finally:
        session.close()
