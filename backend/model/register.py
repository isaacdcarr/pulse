from flask import request
from flask_restful import Resource
from json import dumps, loads
import sqlite3
from .misc import hash_password

class Register(Resource):
   def post(self):
      conn = sqlite3.connect('model/data/pulse.db')
      c = conn.cursor()

      print(request)
      c.execute("select count(*) from users where email='%s'" % request.json['email'])
      if c.fetchone()[0] > 0:
         return {"success": "false"}

      password = hash_password(request.json['password'])
      print(request.json)
      if request.json['doctor'] == True:
         cmd = """
         INSERT INTO users(
            firstName, lastName,
            email, phone,
            hashedPassword, isDoctor,
            city, region, country,
            roleTitle, roleInstitution,
            degreeTitle, degreeInstitution
         )
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"""
         values = (\
            request.json['firstName'],\
            request.json['lastName'],\
            request.json['email'],\
            request.json['phone'], \
            password,\
            1,\
            request.json['city'],\
            request.json['region'],\
            request.json['country'],\
            request.json['roleTitle'],\
            request.json['roleInstitution'],\
            request.json['degreeTitle'],\
            request.json['degreeInstitution'],\
            )
         print("\nValues are:\n" + str(values))
      else:
         cmd = """
         INSERT INTO users(
            firstName, lastName,
            email, phone,
            hashedPassword, isDoctor,
            city, region, country,
            roleTitle, roleInstitution,
            numPatients
         )
         VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)"""
         values = (\
            request.json['firstName'],\
            request.json['lastName'],\
            request.json['email'],\
            request.json['phone'], \
            password,\
            0,\
            request.json['city'],\
            request.json['region'],\
            request.json['country'],\
            request.json['roleTitle'],\
            request.json['roleInstitution'],\
            0)
         #{request.json['numPatients']},\
      c.execute(cmd, values)
      conn.commit()
      conn.close()

      return dumps({'success': 'true'})
