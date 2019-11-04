from flask import request
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
      c.execute("select id, hashedPassword from users where users.email='%s'" % email)
      (u_id, stored_password) = c.fetchone()
      conn.close()
      print(f"{u_id}\t{stored_password}\t{password}")
      if hash_password(stored_password) == password:
         return dumps({
            'u_id': u_id,
            'token': u_id
         })
      else:
         return dumps({})


