from flask import Flask, request
from flask_restful import Resource, Api
from flask_cors import CORS

from model.auth import Auth
from model.register import Register
from model.patients import Patients, IndividualPatient

app = Flask(__name__)
CORS(app)
api = Api(app)

api.add_resource(Auth, '/auth')
api.add_resource(Register, '/register')
api.add_resource(Patients, '/patients')
api.add_resource(IndividualPatient, '/patients/<int:pid>')

if __name__ == '__main__':
   app.run(debug=True)

