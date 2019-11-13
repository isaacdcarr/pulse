from flask import request
from flask_restful import Resource
from json import dumps, loads
import sqlite3
import base64
from .data.healthItems import healthItems

def get_patients(u_id, past=False):
   conn = sqlite3.connect('model/data/pulse.db')
   c = conn.cursor()

   # Check if doctor
   c.execute("select isDoctor from users where id='%s'" % u_id)
   isDoctor = c.fetchone()[0]

   if (isDoctor == 1):
      if past:
         rows = c.execute("""
            SELECT id, firstName, lastName, uploadTime
            FROM patients
            WHERE reviewTime IS NOT NULL
            AND reviewBy='%s'
            ORDER BY reviewTime;
         """ % u_id)
      else:
         rows = c.execute("""
            SELECT id, firstName, lastName, uploadTime
            FROM patients
            WHERE reviewTime IS NULL
            ORDER BY uploadTime;
         """)
   else:
      rows = c.execute("""
         SELECT id, firstName, lastName, uploadTime
         FROM patients
         WHERE where uploadBy='%s'
         ORDER BY uploadTime;
      """ % u_id)

   toReturn = []
   for row in rows:
      toReturn.append({
         'id' : row[0],
         'firstName' : row[1],
         'lastName' : row[2],
         'uploadTime' : row[3],
      })
   c.close()
   return dumps(toReturn)

class Patients(Resource):
   def get(self):
      return get_patients(request.args['u_id'])

class PastPatients(Resource):
   def get(self):
      return get_patients(request.args['u_id'], past=True)

class IndividualPatient(Resource):
   def get(self, pid):
      # Connect to DB
      conn = sqlite3.connect('model/data/pulse.db')
      c = conn.cursor()

      # Execute query
      sql = '''
         SELECT *
         FROM patients
         WHERE id='%s'
      ''' % pid
      c.execute(sql)

      # Get Results
      dbResult = c.fetchone()
      patientData = {}
      for i, val in enumerate(healthItems):
         patientData[val] = dbResult[i] if dbResult[i] is not None else ''

      # Get name of uploadBy
      for i in ['uploadBy', 'reviewBy']:
         if patientData[i] != "":
            c.execute("""
               SELECT firstName, lastName
               FROM users
               WHERE id='%s'
            """ % patientData[i])
            result = c.fetchone()
            print(result)
            patientData[i] = result[0] + " " + result[1]

      # close db and return
      conn.close()
      return patientData

