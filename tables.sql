CREATE TABLE IF NOT EXISTS userDb(
userid SERIAL PRIMARY KEY,
username TEXT UNIQUE,
password TEXT,
profilePic TEXT
);

CREATE TABLE IF NOT EXISTS tweetDb(
tweetid SERIAL PRIMARY KEY,
tweetbody TEXT,
userid INTEGER,
tags TEXT [],
postdate TIMESTAMP
);

CREATE TABLE IF NOT EXISTS tagdb(
tagid SERIAL PRIMARY KEY,
tagtext TEXT
);

-- CREATE TABLE IF NOT EXISTS tagrel(
-- tagrelid SERIAL PRIMARY KEY,
-- tagid INTEGER [],
-- tweetid INTEGER
-- );

CREATE TABLE IF NOT EXISTS followrel(
followid SERIAL PRIMARY KEY,
user_a INTEGER,
user_b INTEGER
);

CREATE TABLE IF NOT EXISTS favtweet(
favid SERIAL PRIMARY KEY,
user_id INTEGER,
tweed_id INTEGER
);