
CREATE TABLE IF NOT EXISTS users(
    id                  INTEGER PRIMARY KEY AUTOINCREMENT,
    firstName          TEXT NOT NULL,
    lastName           TEXT NOT NULL,
    email               TEXT NOT NULL UNIQUE,
    phone               TEXT UNIQUE,
    hashedPassword      TEXT NOT NULL,
    isDoctor            INTEGER NOT NULL,
    city                TEXT NOT NULL,
    region              TEXT NOT NULL,
    country             TEXT NOT NULL,
    roleTitle           TEXT NOT NULL,
    roleInstitution     TEXT NOT NULL,
    degreeTitle         TEXT,
    degreeInstitution   TEXT,
    numReviewed         INTEGER,
    numUploaded         INTEGER
);
CREATE TABLE IF NOT EXISTS patients(
    id                  INTEGER PRIMARY KEY AUTOINCREMENT,
    firstName           TEXT NOT NULL,
    lastName            TEXT NOT NULL,
    heartRate           INTEGER NOT NULL,
    oxySat              NUMERIC NOT NULL,
    respRate            INTEGER NOT NULL,
    chestXray           BLOB,
    uploadTime          TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    uploadBy            INTEGER NOT NULL,
    reviewTime          TEXT,
    reviewBy            INTEGER,
    seekHelp            INTEGER,
    pneumoniaPresent    INTEGER,
    doctorNote          TEXT,
    FOREIGN KEY (uploadBy) REFERENCES users(id),
    FOREIGN KEY (reviewBy) REFERENCES users(id)
);

INSERT INTO users(firstName, lastName,email,phone,hashedPassword,isDoctor,city,region,country,roleTitle,roleInstitution,degreeTitle,degreeInstitution)
VALUES("Isaac","Carr","isaacdcarr@gmail.com","0",".",1,"","","","Doctor","lol","Med","UNSW");

INSERT INTO patients(firstName,lastName,heartRate,oxySat,respRate,uploadBy)
VALUES("Lara","Coleman",0,9,9,1);
