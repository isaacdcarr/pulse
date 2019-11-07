from flask import request
from flask_restful import Resource
from json import dumps, loads
import sqlite3
from .data.healthItems import healthItems

class Patients(Resource):
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

class IndividualPatient(Resource):
   def get(self, pid):
      conn = sqlite3.connect('model/data/pulse.db')
      c = conn.cursor()
      c.execute("""
         SELECT *
         FROM patients
         WHERE id='%s'
      """ % pid)
      dbResult = c.fetchone()
      print(dbResult)
      c.close()

      patientData = {}
      for i, val in enumerate(healthItems):
         patientData[val] = dbResult[i] if dbResult[i] is not None else ''

      return patientData

