import sqlite3

def check_password(c, email, password):
    (u_id, db_password) = c.execute(f"select password from users where users.email={email}")
    if db_password == password:
        return (u_id, u_id)
    else:
        return (None, None)
