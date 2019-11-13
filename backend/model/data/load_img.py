import sqlite3
import os

def convertToBinary(filename):
   with open(filename, 'rb') as file:
      data = file.read()
   return data


def main():
   rel_path = '/../../../../otis/data/chest_xray/train/NORMAL/NORMAL2-IM-1423-0001.jpeg'
   img = os.getcwd() + '/test.png'

   con = sqlite3.connect('pulse.db')
   cur = con.cursor()

   sql_user = """
      INSERT INTO 'patients'
      ('firstName', 'lastName','heartRate','oxySat','respRate','uploadBy')
      VALUES(?,?,?,?,?,?)
   """
   data_user = ("Hayley","Mallinder",60,96.96,30,1)
   cur.execute(sql_user, data_user)

   sql_xray = '''
      INSERT INTO 'xrays'
      ('id','xray')
      VALUES(?,?)
   '''
   data_xray = (6, convertToBinary(img))
   cur.execute(sql_xray,data_xray)
   con.commit()
   con.close()

if __name__ == '__main__':
   main()
