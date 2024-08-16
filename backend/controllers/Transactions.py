from decimal import Decimal

from flask import Blueprint, request, jsonify
from connection.connector import connection
from sqlalchemy.orm import sessionmaker
from models.Transactions import Transactions
from models.Promotions import Promotions
from models.Products import Products
from models.TransactionDetails import TransactionDetails

from flask_jwt_extended import jwt_required, get_jwt_identity
from decorator import role_required
from sqlalchemy.exc import SQLAlchemyError
from connection.connector import session

transaction_routes = Blueprint("transaction_routes", __name__)

# Utility Functions


@transaction_routes.route("/", methods=["POST"])
@jwt_required()
@role_required("buyer")
def create_transactions_and_transaction_details():
    current_user_id = get_jwt_identity()

    try:
        existing_transaction = (
            session.query(Transactions)
            .filter_by(user_id=current_user_id, transaction_status="pending")
            .first()
        )
        if not existing_transaction:
            new_transaction = Transactions(
                user_id=current_user_id,
                transaction_number=Transactions.generate_transactions_number(),
                total_price_all_before=Decimal("0.00"),
                total_price_all=Decimal("0.00"),
                transaction_status="pending",
            )
            session.add(new_transaction)
            session.commit()
        else:
            new_transaction = existing_transaction

        product_id = request.json.get("product_id")
        quantity = request.json.get("quantity", 1)

        # Fetch the product and its price
        product = session.query(Products).filter_by(id=product_id).first()
        if not product:
            return jsonify({"message": "Product not found"}), 404

        # Calculate the total price item
        total_price_item = quantity * product.price

        # Add new transaction detail
        new_transaction_detail = TransactionDetails(
            transaction_id=new_transaction.id,
            product_id=product_id,
            quantity=quantity,
            price=product.price,
            total_price_item=total_price_item,
        )
        session.add(new_transaction_detail)

        # Update the total price before any promotions
        new_transaction.total_price_all_before += total_price_item

        promotion_id = request.json.get("promotion_id")
        if promotion_id:
            promotion = session.query(Promotions).filter_by(id=promotion_id).first()
            if promotion:
                new_transaction.apply_promotions(promotion)
            else:
                new_transaction.total_price_all = new_transaction.total_price_all_before
        else:
            new_transaction.total_price_all = new_transaction.total_price_all_before

        session.commit()

        return (
            jsonify(
                {
                    "transaction": new_transaction.to_dict(),
                    "transaction_detail": new_transaction_detail.to_dict(),
                }
            ),
            201,
        )
    except SQLAlchemyError as e:
        session.rollback()
        return jsonify({"message": "An error occurred", "error": str(e)}), 500
    finally:
        session.close()


@transaction_routes.route(
    "/<int:transaction_id>/details/<int:detail_id>", methods=["PUT"]
)
@jwt_required()
@role_required("buyer")
def edit_transaction_detail(transaction_id, detail_id):
    try:
        transaction_detail = (
            session.query(TransactionDetails)
            .filter_by(id=detail_id, transaction_id=transaction_id)
            .first()
        )
        if not transaction_detail:
            return jsonify({"message": "Transaction detail not found"}), 404

        new_quantity = request.json.get("quantity")
        if new_quantity is None or new_quantity <= 0:
            return jsonify({"message": "Invalid quantity provided"}), 400

        # Update total price based on new quantity
        transaction_detail.total_price_item = new_quantity * transaction_detail.price
        transaction_detail.quantity = new_quantity

        # Update the total price of the transaction
        transaction = session.query(Transactions).filter_by(id=transaction_id).first()
        transaction.total_price_all = sum(
            [detail.total_price_item for detail in transaction.transaction_details]
        )

        session.commit()
        return jsonify({"message": "Transaction detail updated successfully"}), 200

    except SQLAlchemyError as e:
        session.rollback()
        return jsonify({"message": "An error occurred", "error": str(e)}), 500
    finally:
        session.close()


# Delete transaction detail
@transaction_routes.route(
    "/<int:transaction_id>/details/<int:detail_id>", methods=["DELETE"]
)
@jwt_required()
@role_required("buyer")
def delete_transaction_detail(transaction_id, detail_id):
    try:
        transaction_detail = (
            session.query(TransactionDetails)
            .filter_by(id=detail_id, transaction_id=transaction_id)
            .first()
        )
        if not transaction_detail:
            return jsonify({"message": "Transaction detail not found"}), 404

        session.delete(transaction_detail)

        # Update the total price of the transaction
        transaction = session.query(Transactions).filter_by(id=transaction_id).first()
        transaction.total_price_all = sum(
            [detail.total_price_item for detail in transaction.transaction_details]
        )

        session.commit()
        return jsonify({"message": "Transaction detail deleted successfully"}), 200

    except SQLAlchemyError as e:
        session.rollback()
        return jsonify({"message": "An error occurred", "error": str(e)}), 500
    finally:
        session.close()


# Get all transaction details based on transaction_id
@transaction_routes.route("/<int:transaction_id>/details", methods=["GET"])
@jwt_required()
@role_required("buyer")
def get_transaction_details(transaction_id):
    try:
        # Query the transaction based on the transaction ID and status
        transaction = (
            session.query(Transactions)
            .filter_by(id=transaction_id, user_id=get_jwt_identity())
            .first()
        )

        if not transaction:
            return jsonify({"message": "Transaction not found"}), 404

        if transaction.transaction_status == "paid":
            return (
                jsonify({"message": "No details available for paid transactions"}),
                204,
            )

        # If the transaction is pending, retrieve its details
        transaction_details = (
            session.query(TransactionDetails)
            .filter_by(transaction_id=transaction_id)
            .all()
        )

        return (
            jsonify(
                {
                    "transaction": transaction.to_dict(),
                    "details": [detail.to_dict() for detail in transaction_details],
                }
            ),
            200,
        )

    except SQLAlchemyError as e:
        session.rollback()
        return jsonify({"message": "An error occurred", "error": str(e)}), 500
    finally:
        session.close()


# Apply promotion to a transaction
@transaction_routes.route("`/<int:transaction_id>/apply-promotion`", methods=["PUT"])
@jwt_required()
@role_required("buyer")
def apply_promotion(transaction_id):
    try:
        transaction = (
            session.query(Transactions)
            .filter_by(id=transaction_id, transaction_status="pending")
            .first()
        )
        if not transaction:
            return jsonify({"message": "Transaction not found or not pending"}), 404

        voucher_code = request.json.get("voucher_code")
        promotion = (
            session.query(Promotions).filter_by(voucher_code=voucher_code).first()
        )

        if not promotion:
            return jsonify({"message": "Promotion not found"}), 404

        # Apply promotion to the transaction
        transaction.promotion_id = promotion.id
        transaction.apply_promotions(promotion)

        session.commit()
        return (
            jsonify(
                {
                    "message": "Promotion applied successfully",
                    "transaction": transaction.to_dict(),
                }
            ),
            200,
        )

    except SQLAlchemyError as e:
        session.rollback()
        return jsonify({"message": "An error occurred", "error": str(e)}), 500
    finally:
        session.close()


@transaction_routes.route("/<int:transaction_id>/checkout", methods=["PUT"])
@jwt_required()
@role_required("buyer")
def checkout_transaction(transaction_id):
    current_user_id = get_jwt_identity()

    try:
        transaction = (
            session.query(Transactions)
            .filter_by(
                id=transaction_id, user_id=current_user_id, transaction_status="pending"
            )
            .first()
        )
        if not transaction:
            return jsonify({"message": "Transaction not found or already paid"}), 404

        # Loop through each transaction detail to deduct stock
        for detail in transaction.transaction_details:
            product = session.query(Products).filter_by(id=detail.product_id).first()
            if not product:
                return (
                    jsonify(
                        {"message": f"Product with ID {detail.product_id} not found"}
                    ),
                    404,
                )

            if product.stock < detail.quantity:
                return (
                    jsonify(
                        {
                            "message": f"Not enough stock for product {product.title}. Available: {product.stock}, Requested: {detail.quantity}"
                        }
                    ),
                    400,
                )

            # Deduct the stock
            product.stock -= detail.quantity

        # Change transaction status to "paid"
        transaction.transaction_status = "paid"
        session.commit()

        return (
            jsonify(
                {
                    "message": "Transaction successfully checked out",
                    "transaction": transaction.to_dict(),
                }
            ),
            200,
        )

    except SQLAlchemyError as e:
        session.rollback()
        return jsonify({"message": "An error occurred", "error": str(e)}), 500
    finally:
        session.close()


@transaction_routes.route("/transactions/<int:transaction_id>", methods=["GET"])
@jwt_required()
@role_required("buyer")
def get_transaction_and_details(transaction_id):
    current_user_id = get_jwt_identity()

    try:
        transaction = (
            session.query(Transactions)
            .filter_by(id=transaction_id, user_id=current_user_id)
            .first()
        )
        if not transaction:
            return jsonify({"message": "Transaction not found"}), 404

        if transaction.transaction_status == "paid":
            return (
                jsonify(
                    {"message": "Transaction is already paid. No details to display."}
                ),
                204,
            )

        # If the transaction is pending, return its details
        transaction_details = [
            detail.to_dict() for detail in transaction.transaction_details
        ]

        return (
            jsonify(
                {
                    "transaction": transaction.to_dict(),
                    "transaction_details": transaction_details,
                }
            ),
            200,
        )

    except SQLAlchemyError as e:
        session.rollback()
        return jsonify({"message": "An error occurred", "error": str(e)}), 500
    finally:
        session.close()


@transaction_routes.route("/details", methods=["GET"])
@jwt_required()
@role_required("seller")
def get_transaction_details_by_seller():
    current_user_id = get_jwt_identity()
    try:
        # Query all transaction details for products owned by the current seller
        transaction_details = (
            session.query(TransactionDetails)
            .join(Products, TransactionDetails.product_id == Products.id)
            .filter(Products.user_id == current_user_id)
            .all()
        )

        if not transaction_details:
            return (
                jsonify({"message": "No transaction details found for your products"}),
                404,
            )

        return jsonify([detail.to_dict() for detail in transaction_details]), 200

    except SQLAlchemyError as e:
        session.rollback()
        return jsonify({"message": "An error occurred", "error": str(e)}), 500
    finally:
        session.close()
