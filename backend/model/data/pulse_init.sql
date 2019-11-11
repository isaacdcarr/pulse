
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
    numPatients         INTEGER,
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
    uploadTime          TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    uploadBy            INTEGER NOT NULL,
    reviewTime          TIMESTAMP,
    reviewBy            INTEGER,
    chestXray           BLOB,
    seekHelp            INTEGER,
    pneumoniaPresent    INTEGER,
    doctorNote          TEXT,
    FOREIGN KEY (uploadBy) REFERENCES users(id),
    FOREIGN KEY (reviewBy) REFERENCES users(id)
);

-- HF
-- 9737d037ffdaadd153a8709c46276bcb = . not hashed
INSERT INTO users(firstName,lastName,email,phone,hashedPassword,isDoctor,city,region,country,roleTitle,roleInstitution)
VALUES("James","Smith","james.smith@gmail.com","+61412345678","9737d037ffdaadd153a8709c46276bcb",0,"Sydney","NSW","Australia","Teacher","Xavier Catholic College, Ballina");

-- Doctors
INSERT INTO users(firstName,lastName,email,phone,hashedPassword,isDoctor,city,region,country,roleTitle,roleInstitution,degreeTitle,degreeInstitution)
VALUES("Isaac","Carr","isaacdcarr@gmail.com","0","9737d037ffdaadd153a8709c46276bcb",1,"","","","Doctor","lol","Med","UNSW");

-- Patients
INSERT INTO patients(firstName,lastName,heartRate,oxySat,respRate,uploadBy,uploadTime)
VALUES("Robert","Carr",123,99,50,1,'2019-10-30 10:00:00');
INSERT INTO patients(firstName,lastName,heartRate,oxySat,respRate,uploadBy,uploadTime)
VALUES("Jane","Carr",60,97.43,51,1,'2019-12-30 10:00:00');
INSERT INTO patients(firstName,lastName,heartRate,oxySat,respRate,uploadBy)
VALUES("Lara","Coleman",0,9,9,1);
INSERT INTO patients(firstName,lastName,heartRate,oxySat,respRate,uploadBy)
VALUES("Kenji","Brameld",0,10,10,1);
