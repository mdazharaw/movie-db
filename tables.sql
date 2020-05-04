CREATE TABLE IF NOT EXISTS userDb(
userid SERIAL PRIMARY KEY,
username TEXT UNIQUE,
password TEXT,
profilePic TEXT
);

CREATE TABLE IF NOT EXISTS reviewdb(
reviewid SERIAL PRIMARY KEY,
userid INTEGER,
rating INTEGER,
review TEXT,
movieid INTEGER
);
