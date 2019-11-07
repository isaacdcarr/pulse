from flask import request
from flask_restful import Resource
from json import dumps, loads
import sqlite3

class Patient(Resource):
   def get(self):
      conn = sqlite3.connect('model/data/pulse.db')
      c = conn.cursor()

      print(request.args)
      if (request.args['doctor'] == 'true'):
         rows = c.execute("""
            SELECT id, firstName, lastName, uploadTime
            FROM patients
            WHERE reviewTime IS NULL
            ORDER BY uploadTime;
         """)

         toReturn = []
         for row in rows:
            toReturn.append({
               'id' : row[0],
               'firstName' : row[1],
               'lastName' : row[2],
               'uploadTime' : row[3],
            })

         return dumps(toReturn)

      c.close()

