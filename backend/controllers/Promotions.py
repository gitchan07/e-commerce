from flask import Blueprint, jsonify
from connection.connector import connection
from sqlalchemy.orm import sessionmaker
from models.Promotions import Promotions

promotion_routes = Blueprint("promotion_routes", __name__)


@promotion_routes.route("/testing", methods=["GET"])
def testing():
    Session = sessionmaker(bind=connection)
    s = Session()
    try:
        promotions = s.query(Promotions).first()
        response = {
            "message": "good connection",
            "promotion_example": (
                promotions.to_dict() if promotions else "No promotions available"
            ),
        }
        status_code = 200
    except Exception as e:
        response = {"message": "connection failed", "error": str(e)}
        status_code = 500
    finally:
        s.close()

    return jsonify(response), status_code
