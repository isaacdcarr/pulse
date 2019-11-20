from flask import request
from flask_restful import Resource
from json import dumps, loads
import sqlite3
import base64
from keras.models import load_model
from keras.preprocessing    import image
import numpy as np
import os

def load_img(img_bytes,size=250):
   tmp_file = open('./tmp','wb')
   tmp_file.write(img_bytes)
   tmp_file.close()
   X = []
   X.append(np.array(image.load_img('tmp', target_size=(size, size),color_mode="grayscale")))
   X = np.array(X)
   X = X.reshape(X.shape + (1,))
   os.remove('tmp')
   return X

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
      print("... Loading model")
      conn = sqlite3.connect('model/data/pulse.db')
      c = conn.cursor()

      # Get otis prediction
      cnn = self.cnn = load_model('model/otis/entire_model_2019-11-19_02:45_18_singledata_quickresults_30epochs_250size.hdf5')
      img = request.files["chestXray"].read()
      pred_array = cnn.predict(load_img(img,250),verbose=1)
      pred = int(round(pred_array[0][0]))
      print(pred)

      # to see if xray already exists check
      c.execute("""
         SELECT id FROM xrays where ID='%s'
      """ % pid)
      results = c.fetchone()

      # if there is a result, update entry
      if results:
         sql = '''
            UPDATE xrays
            SET xray=?, otisDiagnosis=?
            WHERE id=?
         '''
         data = (img, pred, pid)

      # insert entry
      else:
         sql = '''
            INSERT into xrays
            ('id', 'xray','otisDiagnosis')
            VALUES(?,?,?)
         '''
         data = (pid, img, pred)

      try:
         c.execute(sql, data)
         conn.commit()
      except Exception as e:
         print(e)
         return {'success' : False}

      conn.close()
      return {'success' : True}

