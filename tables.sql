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

CREATE TABLE IF NOT EXISTS watchlist(
watchlistid SERIAL PRIMARY KEY,
userid INTEGER,
movieid INTEGER,
title TEXT,
poster TEXT,
plot TEXT
);

CREATE TABLE IF NOT EXISTS commlistdata(
commlistid INTEGER,
movieid INTEGER,
title TEXT,
poster TEXT,
plot TEXT
);

CREATE TABLE IF NOT EXISTS commlistdetail(
commlistid SERIAL PRIMARY KEY,
creatorid INTEGER,
listname TEXT,
listDescription TEXT
);


