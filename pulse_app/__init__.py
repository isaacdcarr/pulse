import os
import sqlite3
from flask              import Flask
from flask_sqlalchemy   import SQLAlchemy

conn = sqlite3.connect("pulse_app/model/pulse.db")
db = conn.cursor()

def create_app():
    app = Flask(__name__)

    app.config['SECRET_KEY'] = 'guivant'

    from .routes import main_bp, auth_bp, patients_bp
    app.register_blueprint(main_bp)
    app.register_blueprint(auth_bp)
    app.register_blueprint(patients_bp)

    return app
