import hashlib

def hash_password(password):
   password += "jose"
   hash_password = hashlib.md5(password.encode())
   return hash_password.hexdigest()


