from flask  import Blueprint, render_template
from pulse_app import db

main_bp = Blueprint('main', __name__)

@main_bp.route('/', methods=["GET"])
def index():
    return render_template('index.html')

@main_bp.route('/about')
def about():
    return render_template("about.html")