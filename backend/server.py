from flask import Flask, request
import sqlite3
from json import dumps
import atexit

from .model.user        import *
from .model.patient     import *
from .model.misc        import *

app = Flask(__name__)

conn = sqlite3.connect('model/pulse.db')
c = conn.cursor()

def shutdown():
    c.close()

atexit.register(shutdown)

@app.route('/auth/login', methods=["POST"])
def login():
    email = request.form.get('username')
    password = hash_password(request.form.get('password'))

    (u_id, token) = check_password(c, email, password)

    if u_id is None:
        return dumps({})
    else:
        return dumps({
            'u_id' : u_id,
            'token' : token
        })


if __name__ == '__main__':
    app.run(debug=True)

