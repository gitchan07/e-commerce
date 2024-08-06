from flask import Blueprint, request, jsonify
from connection.connector import connection
from sqlalchemy.orm import sessionmaker
from models.Transactions import Transactions
from flasgger import swag_from

transaction_routes = Blueprint("transaction_routes", __name__)


# POST/Transaction
@transaction_routes.route("/", methods=["POST"])
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
        return jsonify({"message": "Transaction Created"}), 200
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
        # Use dict comprehensions to filter out non-serializable attributes
        transactions_dicts = [t.__dict__.copy() for t in transactions]
        for t_dict in transactions_dicts:
            t_dict.pop("_sa_instance_state", None)
        return jsonify(transactions_dicts), 200
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
            transaction_dict = transaction.__dict__.copy()
            transaction_dict.pop("_sa_instance_state", None)
            return jsonify(transaction_dict), 200
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
