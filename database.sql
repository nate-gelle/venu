CREATE TABLE person (
    id SERIAL PRIMARY KEY,
    username VARCHAR (80) UNIQUE NOT NULL,
    password VARCHAR (1000) NOT NULL,
    type VARCHAR (80) NOT NULL
);

CREATE TABLE venue (
    id SERIAL PRIMARY KEY,
    name VARCHAR (80) UNIQUE NOT NULL,
    category VARCHAR (80),
    url VARCHAR (80),
    address VARCHAR (160),
    phone VARCHAR (40),
    outdoor BOOLEAN,
    price VARCHAR (3),
    person_id INT REFERENCES person,
    image_url VARCHAR (1000),
    lat DOUBLE PRECISION,
    long DOUBLE PRECISION
);

CREATE TABLE patron (
    id SERIAL PRIMARY KEY,
    first VARCHAR (80) NOT NULL,
    last VARCHAR (80),
    person_id INT REFERENCES person
);

CREATE TABLE checkins (
    id SERIAL PRIMARY KEY,
    venue_person_id INT NOT NULL,
    patron_person_id INT UNIQUE NOT NULL
);

CREATE TABLE friendships (
    id SERIAL PRIMARY KEY,
    frienda INT NOT NULL,
    friendb INT NOT NULL
);