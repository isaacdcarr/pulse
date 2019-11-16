from flask import request
from flask_restful import Resource
from json import dumps, loads
import sqlite3
import base64

class Xray(Resource):
   def get(self, pid):
      conn = sqlite3.connect('model/data/pulse.db')
      c = conn.cursor()

      sql = '''
         SELECT xray
         FROM xrays
         where id='%s'
      ''' % pid
      c.execute(sql)

      result = c.fetchone()
      conn.close()

      if result is not None:
         return {'xray' : str(base64.b64encode(result[0]))}
      else:
         return {'xray' : "" }

   def post(self, pid):
      conn = sqlite3.connect('model/data/pulse.db')
      c = conn.cursor()
      sql = '''
         INSERT into xrays
         ('id', 'xray')
         VALUES(?,?)
      '''
      data = (pid, request.files["chestXray"].read())
      try:
         c.execute(sql, data)
         conn.commit()
      except Exception as e:
         print(e)
         return {'success' : False}

      conn.close()
      return {'success' : True}

