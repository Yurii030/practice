from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import psycopg2

app = Flask(__name__)
CORS(app)

app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql+psycopg2://[ojt]:[root]@[127.0.0.1]:[3306]/[yuri990503!]"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)