from flask import Blueprint, request, jsonify
from connection.connector import connection
from sqlalchemy.orm import sessionmaker
from models.Transactions import Transactions
from flasgger import swag_from

transaction_routes = Blueprint("transaction_routes", __name__)

Session = sessionmaker(bind=connection)
session = Session()


# UNTUK TESTING UDH BISA MASUK BLM
@transaction_routes.route("/testing", methods=["GET"])
def testing():
    Session = sessionmaker(bind=connection)
    s = Session()
    try:
        details = s.query(Transactions).first()
        response = {
            "message": "good connection",
            "dict": (details.to_dict() if details else "No transaction  available"),
        }
        status_code = 200
    except Exception as e:
        response = {"message": "connection failed", "error": str(e)}
        status_code = 500
    finally:
        s.close()

    return jsonify(response), status_code


# POST/Transaction
@transaction_routes.route("/", methods=["POST"])
def transaction():
    data = request.get_json()

    required_fields = ["user_id", "total_price_all_before", "transaction_status"]
    for field in required_fields:
        if field not in data:
            return jsonify({"message": f"{field} is required"}), 400

    Session = sessionmaker(bind=connection)
    s = Session()
    try:
        new_transaction = Transactions(
            user_id=data["user_id"],
            total_price_all_before=data["total_price_all_before"],
            transaction_status=data["transaction_status"],
            transaction_number=Transactions.generate_transactions_number(),
        )
        s.add(new_transaction)
        s.commit()

        return (
            jsonify(
                {
                    "message": "Transaction Created",
                    "transaction": new_transaction.to_dict(),
                }
            ),
            200,
        )
    except Exception as e:
        s.rollback()
        return jsonify({"message": "Error creating transaction", "error": str(e)}), 500
    finally:
        s.close()


# GET
@transaction_routes.route("/", methods=["GET"])
def get_transactions():
    Session = sessionmaker(bind=connection)
    s = Session()
    try:
        transactions = s.query(Transactions).all()
        return jsonify([t.to_dict() for t in transactions]), 200
    except Exception as e:
        return jsonify({"message": "Error fetching transactions", "error": str(e)}), 500
    finally:
        s.close()


# GET/<int:id>
@transaction_routes.route("/<int:id>", methods=["GET"])
def get_transaction_by_id(id):
    Session = sessionmaker(bind=connection)
    s = Session()
    try:
        transaction = s.query(Transactions).filter(Transactions.id == id).first()
        if transaction:
            return jsonify(transaction.__dict__), 200
        else:
            return jsonify({"message": "Transaction not found"}), 404
    except Exception as e:
        return jsonify({"message": "Error fetching transaction", "error": str(e)}), 500
    finally:
        s.close()


# DELETE/<int:id>
@transaction_routes.route("/<int:id>", methods=["DELETE"])
def delete_transaction_by_id(id):
    Session = sessionmaker(bind=connection)
    s = Session()
    try:
        transaction = s.query(Transactions).filter(Transactions.id == id).first()
        if transaction:
            s.delete(transaction)
            s.commit()
            return jsonify({"message": f"Transaction {transaction.id} deleted"}), 200
        else:
            return jsonify({"message": "Transaction not found"}), 404
    except Exception as e:
        s.rollback()
        return jsonify({"message": "Error deleting transaction", "error": str(e)}), 500
    finally:
        s.close()
