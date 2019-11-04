from flask import Flask, request
from json import dumps
from flask_cors import CORS

import sqlite3
import atexit

from model.user        import *
from model.patient     import *
from model.misc        import *

app = Flask(__name__)

CORS(app)

conn = sqlite3.connect('model/pulse.db')
c = conn.cursor()

def shutdown():
	c.close()

atexit.register(shutdown)

@app.route("/", methods=["GET"])
def index():
	return dumps({})

@app.route('/auth/login', methods=["POST"])
def login():
	email = request.json['email']
	password = hash_password(request.json['password'])
	(u_id, token) = check_password(c, email, password)

	if u_id is None:
		print("rip")
		return dumps({})
	else:
		print("worked")
		return dumps({
			'u_id' : u_id,
			'token' : token
		})

if __name__ == '__main__':
    app.run(debug=True)

