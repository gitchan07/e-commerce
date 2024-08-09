from flask import Blueprint, request, jsonify
from connection.connector import connection
from sqlalchemy.orm import sessionmaker
from models.TransactionDetails import TransactionDetails

transaction_details_routes = Blueprint("transaction_details_routes", __name__)


# UNTUK TESTING UDH BISA MASUK BLM
@transaction_details_routes.route("/ttd/testing", methods=["GET"])
def testing():
    Session = sessionmaker(bind=connection)
    s = Session()
    try:
        details = s.query(TransactionDetails).first()
        response = {
            "message": "good connection",
            "dict": (
                details.to_dict() if details else "No transaction details available"
            ),
        }
        status_code = 200
    except Exception as e:
        response = {"message": "connection failed", "error": str(e)}
        status_code = 500
    finally:
        s.close()

    return jsonify(response), status_code


# POST /{transaction_id}/details
@transaction_details_routes.route("/<int:transaction_id>/details", methods=["POST"])
def add_transaction_detail(transaction_id):
    data = request.get_json()
    required_fields = ["product_id", "quantity", "price"]

    for field in required_fields:
        if field not in data:
            return jsonify({"message": f"{field} is required"}), 400

    Session = sessionmaker(bind=connection)
    s = Session()
    try:
        new_details = TransactionDetails(
            transaction_id=transaction_id,
            product_id=data["product_id"],
            quantity=data["quantity"],
            price=data["price"],
        )
        s.add(new_details)
        s.commit()
        return jsonify({"message": "detail added", "detail": new_details.__dict__}), 200
    except Exception as e:
        s.rollback()
        return jsonify({"message": "Error adding detail", "error": str(e)}), 500
    finally:
        s.close()


# GET /{transaction_id}/details
@transaction_details_routes.route("/<int:transaction_id>/details", methods=["GET"])
def get_transactions_details(transaction_id):
    Session = sessionmaker(bind=connection)
    s = Session()
    try:
        details = (
            s.query(TransactionDetails)
            .filter(TransactionDetails.transaction_id == transaction_id)
            .all()
        )
        return jsonify([d.__dict__ for d in details]), 200
    except Exception as e:
        return jsonify({"message": "Error fetching details", "error": str(e)}), 500
    finally:
        s.close()


@transaction_details_routes.route(
    "/<int:transaction_id>/details/<int:detail_id>", methods=["PUT"]
)
def update_transaction_detail(transaction_id, detail_id):
    data = request.get_json()
    Session = sessionmaker(bind=connection)
    s = Session()
    try:
        detail = (
            s.query(TransactionDetails)
            .filter(
                TransactionDetails.transaction_id == transaction_id,
                TransactionDetails.id == detail_id,
            )
            .first()
        )
        if detail:
            detail.quantity = data.get("quantity", detail.quantity)
            detail.price = data.get("price", detail.price)
            s.commit()
            return (
                jsonify({"message": "Detail updated", "detail": detail.__dict__}),
                200,
            )
        else:
            return jsonify({"message": "Detail not found"}), 404
    except Exception as e:
        s.rollback()
        return jsonify({"message": "Error updating detail", "error": str(e)}), 500
    finally:
        s.close()


# DELETE /<int:transaction_id>/details/<int:detail_id>
@transaction_details_routes.route(
    "/<int:transaction_id>/details/<int:detail_id>", methods=["DELETE"]
)
def delete_transaction_detail(transaction_id, detail_id):
    Session = sessionmaker(bind=connection)
    s = Session()
    try:
        detail = (
            s.query(TransactionDetails)
            .filter(
                TransactionDetails.transaction_id == transaction_id,
                TransactionDetails.id == detail_id,
            )
            .first()
        )
        if detail:
            s.delete(detail)
            s.commit()
            return jsonify({"message": f"Detail {detail.id} deleted"}), 200
        else:
            return jsonify({"message": "Detail not found"}), 404
    except Exception as e:
        s.rollback()
        return jsonify({"message": "Error deleting detail", "error": str(e)}), 500
    finally:
        s.close()
