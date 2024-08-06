import os
from flask import Flask, jsonify, request
from dotenv import load_dotenv
from connection.connector import connection
from sqlalchemy.orm import sessionmaker

from flask_jwt_extended import JWTManager
from flask_login import LoginManager

# import controllers here
from controllers.TransactionDetails import transaction_details_routes
from controllers.Transactions import transaction_routes
from controllers.Products import product_management_bp

# flask --app index run --debug to run

load_dotenv()

app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")


# login manager here
jwt = JWTManager(app)

# Initialize Login Manager
login_manager = LoginManager()
login_manager.init_app(app)

# Register blueprints
app.register_blueprint(transaction_details_routes, url_prefix="/transactions")
app.register_blueprint(transaction_routes, url_prefix="/transactions")
app.register_blueprint(product_management_bp, url_prefix="/products")


# Initialize Swagger
swagger = Swagger(app)


# Logic here
@app.route("/")
def test():
    return "Hello there"


# python index.py
if __name__ == "__main__":
    app.run(debug=True)
