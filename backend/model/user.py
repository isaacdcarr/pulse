import sqlite3

def check_password(c, email, password):
    db_password = c.execute(f"select password from users where users.email={email}")
    if db_password == password:
        # return true
    else:
        return (None, None)
