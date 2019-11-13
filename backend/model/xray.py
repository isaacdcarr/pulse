from flask import request
from flask_restful import Resource
from json import dumps, loads
import sqlite3
import base64

class Xray(Resource):
   def get(self, pid):
      sql = '''
         SELECT xray
         FROM xrays
         where id='%s'
      ''' % pid

      conn = sqlite3.connect('model/data/pulse.db')
      c = conn.cursor()
      c.execute(sql)
      xray = c.fetchone()[0]
      conn.close()

      response = base64.b64encode(xray);
      print(response[0:10])
      print(str(response[0:10]))
      # print(response)
      return  {'xray' : str(response)}
