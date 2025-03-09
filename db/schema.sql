-- This file defines the database including some tables

-- Deletes any existing databases based off name
DROP DATABASE IF EXISTS employees_db;

-- Creates a new database
CREATE DATABASE employees_db;

-- Calls the database
\c employees_db

-- Below are the parameters for each of the 3 different databases. 
CREATE TABLE department (
    id SERIAL PRIMARY KEY,
    department_name VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE role (
    id SERIAL PRIMARY KEY,
    role_title VARCHAR(30) UNIQUE NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INTEGER NOT NULL REFERENCES department(id)
);

CREATE TABLE employee (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER NOT NULL REFERENCES role(id),
    manager_id INTEGER REFERENCES employee(id)
);

-- This file defines the database including some tables

-- Deletes any existing databases based off name
DROP DATABASE IF EXISTS employees_db;

-- Creates a new database
CREATE DATABASE employees_db;

-- Calls the database
\c employees_db

-- Drop existing tables if they exist
DROP TABLE IF EXISTS employee;
DROP TABLE IF EXISTS role;
DROP TABLE IF EXISTS department;

-- Below are the parameters for each of the 3 different databases. 
CREATE TABLE department (
    id SERIAL PRIMARY KEY,
    department_name VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE role (
    id SERIAL PRIMARY KEY,
    role_title VARCHAR(30) UNIQUE NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INTEGER NOT NULL REFERENCES department(id)
);

CREATE TABLE employee (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER NOT NULL REFERENCES role(id),
    manager_id INTEGER REFERENCES employee(id)
);

-- Grant permissions to the user
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO heimsharon;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO heimsharon;