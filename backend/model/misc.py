import hashlib

def hash_password(password):
   password += "jose"
   hash_password = hashlib.md5(password.encode())
   return hash_password.hexdigest()

def convertToBinary(filename):
   with open(filename, 'rb') as file:
      data = file.read()
   return data
