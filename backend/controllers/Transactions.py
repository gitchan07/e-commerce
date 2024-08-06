from flask import Blueprint, request, jsonify
from connection.connector import connection
from sqlalchemy.orm import sessionmaker
from models.Transactions import Transactions
from flasgger import swag_from

transaction_routes = Blueprint("transaction_routes", __name__)


# POST/Transaction
@transaction_routes.route("/transactions", methods=["POST"])
def transaction():
    data = request.get_json()
    required_fields = ["date", "transaction_number", "user_id"]
    for field in required_fields:
        if field not in data:
            return jsonify({"message": f"{field} is required"}), 400

    Session = sessionmaker(bind=connection)
    s = Session()
    try:
        new_transaction = Transactions(
            date=data["date"],
            transaction_number=data["transaction_number"],
            user_id=data["user_id"],
        )
        s.add(new_transaction)
        s.commit()
        return jsonify({"message": "transaction Created"}), 200
    except Exception as e:
        s.rollback()
        return jsonify({"message": "error creating transaction", "error": str(e)}), 500
    finally:
        s.close()


# GET/transactions
@transaction_routes.route("/transactions", methods=["GET"])
def get_transactions():
    Session = sessionmaker(bind=connection)
    s = Session()
    try:
        transactions = s.query(Transactions).all()
        return jsonify([t.__dict__ for t in transactions]), 200
    except Exception as e:
        return jsonify({"message": "Error fetching transactions", "error": str(e)}), 500
    finally:
        s.close()


# GET/transactions/<int:id>
@transaction_routes.route("/transactions/<int:id>", methods=["GET"])
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


# DELETE/transactions/<int:id>
@transaction_routes.route("/transactions/<int:id>", methods=["DELETE"])
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
