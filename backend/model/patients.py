from flask import request
from flask_restful import Resource
from json import dumps, loads
from datetime import datetime
import sqlite3
import base64
from .data.healthItems import healthItems
import inspect

def get_patients(u_id, past=False):
   conn = sqlite3.connect('model/data/pulse.db')
   c = conn.cursor()

   # Check if doctor
   c.execute("select isDoctor from users where id='%s'" % u_id)
   isDoctor = c.fetchone()[0]
   print(isDoctor)

   if (isDoctor == 1):
      if past:
         try:
            rows = c.execute("""
               SELECT id, firstName, lastName, uploadTime
               FROM patients
               WHERE reviewBy='%s'
               AND reviewTime IS NOT NULL
               ORDER BY reviewTime;
         """ % u_id)
         except Exception as e:
            print(e)
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
         WHERE uploadBy='%s'
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
      print(dbResult)
      patientData = {}
      for i, val in enumerate(healthItems):
         print(val)
         patientData[val] = dbResult[i] if dbResult[i] is not None else ''

      # Get name of uploadBy
      for i in ['uploadBy', 'reviewBy']:
         print(i, " ", patientData[i])
         if patientData[i] != "":
            c.execute("""
               SELECT firstName, lastName
               FROM users
               WHERE id='%s'
            """ % patientData[i])
            result = c.fetchone()
            patientData[i] = result[0] + " " + result[1]

      # get xray
      sql = """
         SELECT xray
         FROM xrays
         WHERE id='%s
      """ % pid

      # close db and return
      conn.close()
      print(patientData)
      return patientData

   def post(self, pid):
      for item in request.json.items():
         if item == "":
            return {"success" : False}

      doctorNote = request.json['doctorNote']
      pneuPresent = request.json['pneuPresent']
      seekHelp = request.json['seekHelp']
      u_id = request.json['u_id']
      print(request.json)

      conn = sqlite3.connect('model/data/pulse.db')
      c = conn.cursor()
      print("Made it to", inspect.currentframe().f_lineno)
      sql = '''
         UPDATE patients
         SET pneuPresent=?, seekHelp=?, doctorNote=?, reviewBy=?, reviewTime=?
         WHERE id=?
      '''
      data = (pneuPresent, seekHelp, doctorNote, u_id, datetime.now().strftime("%Y-%m-%d %H:%M:%S"), pid)

      print(sql, data)
      try:
         print("Made it to", inspect.currentframe().f_lineno)
         c.execute(sql, data)
         conn.commit()
         print("updated: ", c.rowcount)
         conn.commit()
      except Exception as e:
         print(e)
         return {'success' : False}
      finally:
         conn.close()

      return {'success' : True }

class NewPatient(Resource):
   def post(self):
      print(request.json)
      if (len(request.json.keys()) < 10):
         return {'success' : False}
      for item in request.json.items():
         if item == "":
            return {"success" : False }


      firstName = request.json['firstName']
      lastName = request.json['lastName']
      heartRate = request.json['heartRate']
      oxySat = request.json['oxySat']
      respRate = request.json['respRate']
      indrawing = request.json['indrawing']
      wheezing = request.json['wheezing']
      crackling = request.json['crackling']
      diffBreath = request.json['diffBreath']
      fever = request.json['fever']

      uploadBy = request.json['u_id']

      conn = sqlite3.connect('model/data/pulse.db')
      c = conn.cursor()

      sql = """
         INSERT INTO patients
         (firstName, lastName, oxySat, heartRate, respRate, uploadBy, indrawing, wheezing, crackling, diffBreath, fever)
         VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
      """
      data = (firstName, lastName, oxySat, heartRate, respRate, uploadBy, indrawing, wheezing, crackling, diffBreath, fever)

      try:
         c.execute(sql, data)
         conn.commit()
      except Exception as e:
         print(e)
         return {'success' : False}


      # get newId
      sql = """
         SELECT id
         FROM PATIENTS
         WHERE firstName=?
         AND lastName=?
         AND uploadBy=?
      """
      data = (firstName, lastName, uploadBy)
      try:
         c.execute(sql, data)
         newId = c.fetchone()[0]
      except Exception as e:
         print(e)
         return {'success' : False}
      # upload Xray
      if 'xray' in request.json.keys():
         xray = request.json['xray']
         sql = """
            INSERT INTO xrays
            (id, xray)
            VALUES (? , ?)
         """
         data = (newId, xray)
         try:
            c.execute(sql, data)
            conn.commit()
         except Exception as e:
            print(e)
            return {'success' : False}
      # upload hfNote
      if 'hfNote' in request.json.keys():
         hfNote = request.json['hfNote']
         sql = """
            UPDATE patients
            SET hfNote=?
            WHERE id=?
         """
         data = (hfNote, newId)
         try:
            c.execute(sql, data)
            conn.commit()
         except Exception as e:
            print(e)
            return {'success' : False}

      conn.close()
      return {'success' : True}

