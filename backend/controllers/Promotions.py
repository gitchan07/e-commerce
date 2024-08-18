from flask import Blueprint, jsonify, request
from connection.connector import connection
from sqlalchemy.orm import sessionmaker
from models.Promotions import Promotions
from sqlalchemy.exc import SQLAlchemyError
from flask_jwt_extended import jwt_required, get_jwt_identity
from decorator import role_required
from connection.connector import session

promotion_routes = Blueprint("promotion_routes", __name__)

# Routes


@promotion_routes.route("", methods=["POST"])
@jwt_required()
@role_required("seller")
def create_promotion():
    data = request.get_json()
    try:
        new_promotion = Promotions(
            voucher_code=data["voucher_code"],
            value_discount=data["value_discount"],
            description=data.get("description", ""),
        )
        session.add(new_promotion)
        session.commit()
        return {"message": "Promotion created successfully"}, 201
    except SQLAlchemyError as e:
        session.rollback()
        return {"message": "Failed to create promotion", "error": str(e)}, 500
    finally:
        session.close()


@promotion_routes.route("", methods=["GET"])
@jwt_required()
def get_promotions():
    filters = {"voucher_code": request.args.get("voucher_code")}
    try:
        query = session.query(Promotions)
        if filters.get("voucher_code"):
            query = query.filter(
                Promotions.voucher_code.ilike(f"%{filters['voucher_code']}%")
            )

        promotions = query.all()
        promotion_list = [promotion.to_dict() for promotion in promotions]
        return jsonify(promotion_list), 200
    except SQLAlchemyError as e:
        return {"message": "Failed to retrieve promotions", "error": str(e)}, 500
    finally:
        session.close()


@promotion_routes.route("/<int:promotion_id>", methods=["GET"])
@jwt_required()
def get_promotion(promotion_id):
    try:
        promotion = session.query(Promotions).get(promotion_id)
        if promotion:
            return jsonify(promotion.to_dict()), 200
        else:
            return {"message": "Promotion not found"}, 404
    except SQLAlchemyError as e:
        return {"message": "Failed to retrieve promotion", "error": str(e)}, 500
    finally:
        session.close()


@promotion_routes.route("/<int:promotion_id>", methods=["PUT"])
@jwt_required()
def update_promotion(promotion_id):
    data = request.get_json()
    try:
        promotion = session.query(Promotions).get(promotion_id)
        if not promotion:
            return {"message": "Promotion not found"}, 404

        promotion.voucher_code = data.get("voucher_code", promotion.voucher_code)
        promotion.value_discount = data.get("value_discount", promotion.value_discount)
        promotion.description = data.get("description", promotion.description)

        session.commit()
        return {"message": "Promotion updated successfully"}, 200
    except SQLAlchemyError as e:
        session.rollback()
        return {"message": "Failed to update promotion", "error": str(e)}, 500
    finally:
        session.close()


@promotion_routes.route("/<int:promotion_id>", methods=["DELETE"])
@jwt_required()
def delete_promotion(promotion_id):
    try:
        promotion = session.query(Promotions).get(promotion_id)
        if not promotion:
            return {"message": "Promotion not found"}, 404

        session.delete(promotion)
        session.commit()
        return {"message": "Promotion deleted successfully"}, 200
    except SQLAlchemyError as e:
        session.rollback()
        return {"message": "Failed to delete promotion", "error": str(e)}, 500
    finally:
        session.close()
