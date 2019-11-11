from flask import request, abort
from flask_restful import Resource
from json import dumps, loads
import sqlite3

from .misc import hash_password

class Auth(Resource):
   def post(self):
      email = request.json['email']
      password = hash_password(request.json['password'])

      conn = sqlite3.connect('model/data/pulse.db')
      c = conn.cursor()
      c.execute("select id, isDoctor, hashedPassword from users where users.email='%s'" % email)
      (u_id, is_doctor, stored_password) = c.fetchone()
      conn.close()

      if stored_password == password:
         return {
            'u_id': u_id,
            'doctor': is_doctor,
            'token': u_id
         }
      else:
         abort(400)


