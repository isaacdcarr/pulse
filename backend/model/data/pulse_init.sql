
CREATE TABLE IF NOT EXISTS users(
    id                  INTEGER PRIMARY KEY AUTOINCREMENT,
    firstName           TEXT NOT NULL,
    lastName            TEXT NOT NULL,
    email               TEXT NOT NULL UNIQUE,
    phone               TEXT,
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
    indrawing           INTEGER NOT NULL,
    wheezing            INTEGER NOT NULL,
    crackling           INTEGER NOT NULL,
    diffBreath          INTEGER NOT NULL,
    fever               INTEGER NOT NULL,
    hfNote              TEXT,
    uploadTime          TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    uploadBy            INTEGER NOT NULL,
    reviewTime          TIMESTAMP,
    reviewBy            INTEGER,
    seekHelp            TEXT,
    pneuPresent         TEXT,
    doctorNote          TEXT,
    FOREIGN KEY (uploadBy) REFERENCES users(id),
    FOREIGN KEY (reviewBy) REFERENCES users(id)
);
CREATE TABLE IF NOT EXISTS xrays(
    id                  INTEGER PRIMARY KEY,
    xray                BLOB,
    otisDiagnosis       INTEGER,
    imgType             TEXT,
    FOREIGN KEY (id) REFERENCES patients(id)
);

-- HF
-- 9737d037ffdaadd153a8709c46276bcb = . not hashed
INSERT INTO users(firstName,lastName,email,phone,hashedPassword,isDoctor,city,region,country,roleTitle,roleInstitution)
VALUES("James","Smith","j@s.com","+61412345678","9737d037ffdaadd153a8709c46276bcb",0,"Sydney","NSW","Australia","Teacher","Xavier Catholic College, Ballina");

-- Doctors
INSERT INTO users(firstName,lastName,email,phone,hashedPassword,isDoctor,city,region,country,roleTitle,roleInstitution,degreeTitle,degreeInstitution)
VALUES("Isaac","Carr","i@c.com","+3232","9737d037ffdaadd153a8709c46276bcb",1,"","","","Doctor","lol","Med","UNSW");

-- Patients
-- INSERT INTO patients(firstName,lastName,heartRate,oxySat,respRate,uploadBy,uploadTime)
-- VALUES("Robert","Carr",123,99,50,1,'2019-10-30 10:00:00');

-- INSERT INTO patients(firstName,lastName,heartRate,oxySat,respRate,uploadBy,uploadTime)
-- VALUES("Jane","Carr",60,97.43,51,1,'2019-12-30 10:00:00');

-- INSERT INTO patients(firstName,lastName,heartRate,oxySat,respRate,uploadBy,uploadTime,reviewBy,reviewTime)
-- VALUES("James","Dean",100,80.01,20,1,'2019-10-30 10:00:00',2,'2019-10-30 10:30:00');

-- INSERT INTO patients(firstName,lastName,heartRate,oxySat,respRate,uploadBy)
-- VALUES("Lara","Coleman",0,9,9,1);

-- INSERT INTO patients(firstName,lastName,heartRate,oxySat,respRate,uploadBy)
-- VALUES("Kenji","Brameld",0,10,10,1);
