import os
from flask import Flask
from dotenv import load_dotenv
from flask_jwt_extended import JWTManager
from flask_login import LoginManager
from flasgger import Swagger

# import controllers here
from controllers.TransactionDetails import transaction_details_routes
from controllers.Transactions import transaction_routes

# flask --app index run --debug to run

load_dotenv()

app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")

# Initialize JWT Manager
jwt = JWTManager(app)

# Initialize Login Manager
login_manager = LoginManager()
login_manager.init_app(app)

# Register blueprints
app.register_blueprint(transaction_details_routes, url_prefix="/transactions")
app.register_blueprint(transaction_routes, url_prefix="/transactions")

# Initialize Swagger
swagger = Swagger(app)


# Logic here
@app.route("/")
def test():
    return "Hello there"


if __name__ == "__main__":
    app.run(debug=True)
