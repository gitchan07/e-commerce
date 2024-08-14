import os
from flask import Flask, jsonify, request
from dotenv import load_dotenv
from connection.connector import connection
from sqlalchemy.orm import sessionmaker
from datetime import datetime, timedelta, timezone
from flask_cors import CORS
from flask_jwt_extended import (
    JWTManager,
    get_jwt,
    get_jwt_identity,
    create_access_token,
    set_access_cookies,
)
from flask_swagger_ui import get_swaggerui_blueprint

# Import controllers here
from controllers.Users import users_routes
from controllers.Categories import category_routes
from controllers.TransactionTransactionDetail import transaction_routes
from controllers.Products import product_routes
from controllers.Promotions import promotion_routes
from controllers.Users import get_blocklist

load_dotenv()

app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(days=1)
app.config["JWT_BLACKLIST_ENABLED"] = True
app.config["JWT_BLACKLIST_TOKEN_CHECKS"] = ['access', 'refresh']

# Initialize JWT Manager
jwt = JWTManager(app)
cors = CORS(app)

@jwt.token_in_blocklist_loader
def check_if_token_in_blocklist(decrypted_token):
    jti = decrypted_token['jti']
    is_valid = get_blocklist(jti)
    return is_valid

# Register blueprints
app.register_blueprint(users_routes, url_prefix="/users")
app.register_blueprint(category_routes, url_prefix="/categories")
app.register_blueprint(product_routes, url_prefix="/products")
app.register_blueprint(transaction_routes, url_prefix="/transactions")
app.register_blueprint(promotion_routes, url_prefix="/promotions")


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
# set jwt time


# acess micro_service  ->
# @app.after_request
# def refresh_expiring_jwts(response):
#     try:
#         exp_timestamp = get_jwt()["exp"]
#         now = datetime.now(timezone.utc)
#         target_timestamp = datetime.timestamp(now + timedelta(hours=40))  # ubah disini
#         if target_timestamp > exp_timestamp:
#             access_token = create_access_token(identity=get_jwt_identity())
#             set_access_cookies(response, access_token)
#         return response
#     except (RuntimeError, KeyError):
#         return response
