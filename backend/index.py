import os
from flask import Flask, jsonify, request
from dotenv import load_dotenv
from connection.connector import connection
from sqlalchemy.orm import sessionmaker

from flask_jwt_extended import JWTManager
from flask_login import LoginManager
from controllers.Products import product_management_bp

# flask --app index run --debug to run

load_dotenv()

app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")

# add blueprint here
app.register_blueprint(product_management_bp, url_prefix='/products')

# login manager here
jwt = JWTManager(app)
login_manager = LoginManager()
login_manager.init_app(app)


# Logic here
@app.route("/")
def test():
    return "Hello there "

#python index.py
if __name__ == "__main__":
    app.run(debug=True)