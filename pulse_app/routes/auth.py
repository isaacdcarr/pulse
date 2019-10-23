from flask  import Blueprint, render_template, request
from pulse_app import db

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/login', methods=["GET", "POST"])
def login():
    return render_template('login.html')

@auth_bp.route('/register', methods=["GET", "POST"])
def register():
    if request.method == "GET":
        return render_template('register.html')
    else:
        return render_template('register.html')
