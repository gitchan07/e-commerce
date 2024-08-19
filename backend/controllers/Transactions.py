from decimal import Decimal
from flask import Blueprint, request, jsonify
from connection.connector import session
from models.Transactions import Transactions
from models.Promotions import Promotions
from models.Products import Products
from models.TransactionDetails import TransactionDetails
from flask_jwt_extended import jwt_required, get_jwt_identity
from decorator import role_required
from sqlalchemy.exc import SQLAlchemyError

transaction_routes = Blueprint("transaction_routes", __name__)

# Utility Functions


@transaction_routes.route("/", methods=["POST"])
@jwt_required()
@role_required("buyer")
def create_transactions_and_transaction_details():
    current_user_id = get_jwt_identity()

    try:
        # Check if there's an existing pending transaction for the user
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

        # Add new transaction detail or update existing one
        existing_detail = (
            session.query(TransactionDetails)
            .filter_by(transaction_id=new_transaction.id, product_id=product_id)
            .first()
        )

        if existing_detail:
            existing_detail.quantity += quantity
            existing_detail.total_price_item += total_price_item
        else:
            new_transaction_detail = TransactionDetails(
                transaction_id=new_transaction.id,
                product_id=product_id,
                quantity=quantity,
                price=product.price,
                total_price_item=total_price_item,
            )
            session.add(new_transaction_detail)

        new_transaction.total_price_all_before += total_price_item
        new_transaction.total_price_all = new_transaction.total_price_all_before

        session.commit()

        return (
            jsonify(
                {
                    "transaction": new_transaction.to_dict(),
                    "transaction_detail": [
                        detail.to_dict()
                        for detail in new_transaction.transaction_details
                    ],
                }
            ),
            201,
        )
    except SQLAlchemyError as e:
        session.rollback()
        return jsonify({"message": "An error occurred", "error": str(e)}), 500
    finally:
        session.close()


@transaction_routes.route("/user/<int:user_id>/details", methods=["GET"])
@jwt_required()
@role_required("buyer")
def get_transaction_details_by_user(user_id):
    current_user_id = get_jwt_identity()

    try:
        if current_user_id != user_id:
            return jsonify({"message": "Unauthorized access"}), 403

        # Find the pending transaction for the user
        transaction = (
            session.query(Transactions)
            .filter_by(user_id=user_id, transaction_status="pending")
            .first()
        )

        if not transaction:
            return (
                jsonify(
                    {
                        "message": "No pending transaction found",
                        "transaction_details": [],
                    }
                ),
                200,
            )

        # Fetch transaction details and associated product data
        transaction_details = []
        for detail in transaction.transaction_details:
            product = session.query(Products).filter_by(id=detail.product_id).first()
            detail_dict = detail.to_dict()
            if product:
                detail_dict["product_name"] = product.title
                detail_dict["product_description"] = product.description
            transaction_details.append(detail_dict)

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


@transaction_routes.route(
    "/user/<int:user_id>/details/<int:product_id>", methods=["PUT"]
)
@jwt_required()
@role_required("buyer")
def edit_transaction_detail_by_user(user_id, product_id):
    current_user_id = get_jwt_identity()

    try:
        if current_user_id != user_id:
            return jsonify({"message": "Unauthorized access"}), 403

        # Find the pending transaction for the user
        transaction = (
            session.query(Transactions)
            .filter_by(user_id=user_id, transaction_status="pending")
            .first()
        )
        if not transaction:
            return jsonify({"message": "No pending transaction found"}), 200

        # Find the specific transaction detail
        transaction_detail = (
            session.query(TransactionDetails)
            .filter_by(transaction_id=transaction.id, product_id=product_id)
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


@transaction_routes.route("/user/<int:user_id>/apply-promotion", methods=["PUT"])
@jwt_required()
@role_required("buyer")
def apply_promotion_to_transaction(user_id):
    current_user_id = get_jwt_identity()

    try:
        if current_user_id != user_id:
            return jsonify({"message": "Unauthorized access"}), 403

        # Find the pending transaction for the user
        transaction = (
            session.query(Transactions)
            .filter_by(user_id=user_id, transaction_status="pending")
            .first()
        )
        if not transaction:
            return jsonify({"message": "No pending transaction found"}), 200

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


@transaction_routes.route("/user/<int:user_id>/checkout", methods=["PUT"])
@jwt_required()
@role_required("buyer")
def checkout_transaction_by_user(user_id):
    current_user_id = get_jwt_identity()

    try:
        if current_user_id != user_id:
            return jsonify({"message": "Unauthorized access"}), 403

        transaction = (
            session.query(Transactions)
            .filter_by(user_id=user_id, transaction_status="pending")
            .first()
        )
        if not transaction:
            return jsonify({"message": "No pending transaction found"}), 200

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
                            "message": f"Not enough stock for product {product.title}. "
                            f"Available: {product.stock}, Requested: {detail.quantity}"
                        }
                    ),
                    400,
                )

        for detail in transaction.transaction_details:
            product = session.query(Products).filter_by(id=detail.product_id).first()
            product.stock -= detail.quantity

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


@transaction_routes.route(
    "/user/<int:user_id>/details/<int:product_id>", methods=["DELETE"]
)
@jwt_required()
@role_required("buyer")
def delete_transaction_detail_by_user(user_id, product_id):
    current_user_id = get_jwt_identity()

    try:
        if current_user_id != user_id:
            return jsonify({"message": "Unauthorized access"}), 403

        transaction = (
            session.query(Transactions)
            .filter_by(user_id=user_id, transaction_status="pending")
            .first()
        )
        if not transaction:
            return jsonify({"message": "No pending transaction found"}), 200

        transaction_detail = (
            session.query(TransactionDetails)
            .filter_by(transaction_id=transaction.id, product_id=product_id)
            .first()
        )
        if not transaction_detail:
            return jsonify({"message": "Transaction detail not found"}), 404

        session.delete(transaction_detail)

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


@transaction_routes.route("/seller/<int:seller_id>/transactions", methods=["GET"])
@jwt_required()
@role_required("seller")
def get_seller_transactions(seller_id):
    current_user_id = get_jwt_identity()

    try:
        if current_user_id != seller_id:
            return jsonify({"message": "Unauthorized access"}), 403

        products = session.query(Products).filter_by(user_id=seller_id).all()

        if not products:
            return jsonify({"message": "No products found for this seller"}), 404

        transactions_data = []
        for product in products:
            transaction_details = (
                session.query(TransactionDetails).filter_by(product_id=product.id).all()
            )

            for detail in transaction_details:
                transaction = (
                    session.query(Transactions)
                    .filter_by(id=detail.transaction_id)
                    .first()
                )
                if transaction:
                    transactions_data.append(
                        {
                            "product": product.title,
                            "transaction_id": transaction.id,
                            "transaction_number": transaction.transaction_number,
                            "buyer_id": transaction.user_id,
                            "quantity": detail.quantity,
                            "total_price_item": detail.total_price_item,
                            "transaction_status": transaction.transaction_status,
                        }
                    )

        if not transactions_data:
            return jsonify({"message": "No transactions found"}), 200

        return jsonify({"transactions": transactions_data}), 200

    except SQLAlchemyError as e:
        session.rollback()
        return jsonify({"message": "An error occurred", "error": str(e)}), 500
    finally:
        session.close()
