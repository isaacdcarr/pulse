from flask  import Blueprint, render_template
from pulse_app import db

patients_bp = Blueprint('patients', __name__)

@patients_bp.route('/patients', methods=["GET"])
def patients():
    return render_template('patients.html')

@patients_bp.route('/patients/past', methods=["GET"])
def past_patients():
    return render_template('patients.html', past="Past")