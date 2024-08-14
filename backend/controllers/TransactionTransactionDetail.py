from flask import Blueprint, request, jsonify
from connection.connector import connection
from sqlalchemy.orm import sessionmaker
from models.TransactionDetails import TransactionDetails
from models.Transactions import Transactions
from models.Products import Products
from flask_jwt_extended import jwt_required, get_jwt_identity
from decorator import role_required
from sqlalchemy.exc import SQLAlchemyError

transaction_routes = Blueprint("transaction_routes", __name__)
Session = sessionmaker(bind=connection)


@transaction_routes.route("/", methods=["POST"])
@jwt_required
@role_required("buyer")
def create_transactions_and_transaction_details():
    s = Session()
    current_user_id = get_jwt_identity()

    try:
        existing_transactions = (
            s.query(Transactions)
            .filter_by(user_id=current_user_id, transactions_status="pending")
            .first()
        )
        if not existing_transactions:
            newTransactions = Transactions(
                user_id=current_user_id,
                transaction_number=Transactions.generate_transactions_number(),
                total_price_all=0.00,
                transaction_status="pending",
            )
            s.add(new_transaction)
            s.commit()
        else:
            new_transaction = existing_transaction
            product_id = request.json.get("product_id")
            quantity = request.json.get("quantity", 1)
            # fetch the price
            product = s.query(products).filter_by(id=product_id).first()
            if not product:
                return jsonify({"message": "Product not found"}), 404
            total_price_item = quantity * product.price
            new_transaction_detail = TransactionDetails(
                transaction_id=new_transaction.id,
                product_id=product_id,
                quantity=quantity,
                price=product.price,
                total_price_item=total_price_item,
            )
            s.add(new_transaction_detail)
            new_transaction.total_price_all += total_price_item

            promotion_id = request.json.get("promotion_id")
            if promotion_id:
                promotion = s.query(Promotions).filter_by(id=promotion_id).first()
                if promotion:
                    new_transaction.apply_promotions(promotion)
            s.commit()
            return jsonify(
                {
                    "transaction": new_transaction.to_dict(),
                    "transaction_detail": new_transaction_detail,
                }
            )
    except SQLAlchemyError as e:
        s.rollback()
        return {"message": "An error occurred", "error": str(e)}
    finally:
        s.close()


"""
constraint: when creating new Transactions : transactionDetail id . ,
user_id : jwt_get_identity
transaction_number : Transaction.generate_transactions_number()
total_price_all : total_price_all_before if promotion_id is none , if promotion_id is not none : total_price_all_after,
when the api is hit , the total_price_all updates by summing all the transactionsDetails total_price_item with the related transactionDetails id in the Transaction tables 
transaction_status : Default pending,

when adding transactionDetail : product id, from product model fill :
Price based off the product id . , 
quantity :  default 1
product_id : product_id (fill this from  json later),
price : the price of the product based off the product_id 
total_price_item : quantity * price

"""
