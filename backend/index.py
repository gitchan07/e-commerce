import os
from flask import Flask, jsonify, request
from dotenv import load_dotenv
from connection.connector import connection
from sqlalchemy.orm import sessionmaker

from flask_jwt_extended import JWTManager
from flask_login import LoginManager
from flask_swagger_ui import get_swaggerui_blueprint

# Import controllers here
from controllers.TransactionDetails import transaction_details_routes
from controllers.Transactions import transaction_routes
from controllers.Products import product_management_bp
from controllers.Users import user_bp

load_dotenv()

app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")

# Initialize JWT Manager
jwt = JWTManager(app)

# Initialize Login Manager
login_manager = LoginManager()
login_manager.init_app(app)

# Register blueprints
app.register_blueprint(transaction_details_routes, url_prefix="/transaction_details")
app.register_blueprint(transaction_routes, url_prefix="/transactions")
app.register_blueprint(product_management_bp, url_prefix="/products")
app.register_blueprint(user_bp, url_prefix="/users")

# Initialize Swagger
SWAGGER_URL = "/apidocs"
API_URL = "/Documentation/products.yaml"
swaggerui_blueprint = get_swaggerui_blueprint(
    SWAGGER_URL, API_URL, config={"app_name": "Product Management API"}
)
app.register_blueprint(swaggerui_blueprint, url_prefix=SWAGGER_URL)


@app.route("/")
def test():
    return "Hello there"


# Run the app
if __name__ == "__main__":
    app.run(debug=True)
