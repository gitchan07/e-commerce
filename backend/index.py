import os
from flask import Flask, jsonify, request
from dotenv import load_dotenv
from connection.connector import connection
from sqlalchemy.orm import sessionmaker

from flask_jwt_extended import JWTManager
from flask_login import LoginManager

# flask --app index run --debug to run

load_dotenv()

app = Flask(__name__)
app.config["SECRET_KEY"] = os.getenv("SECRET_KEY")
if __name__ == "__main__":
    app.run(debug)

# add blueprint here

# login manager here
jwt = JWTManager(app)
login_manager = LoginManager()
login_manager.innit_app(app)


# Logic here
@app.route("/")
def test():
    return "Hello there "
