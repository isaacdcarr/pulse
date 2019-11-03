
CREATE TABLE users (
    contact_id      INTEGER PRIMARY KEY AUTOINCREMENT,
    first_name      TEXT NOT NULL,
    last_name       TEXT NOT NULL,
    email           TEXT NOT NULL UNIQUE,
    phone           TEXT UNIQUE,
    hashedPassword  TEXT NOT NULL,
    city            TEXT NOT NULL,
    region          TEXT NOT NULL,
    country         TEXT NOT NULL,
);

CREATE TABLE doctors (
    id              INTEGER PRIMARY KEY,

    FOREIGN KEY (id)
        REFERENCES users(id)
);

CREATE TABLE hf (

);
