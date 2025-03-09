-- This file defines the database including some tables

-- Deletes any existing databases based off name
DROP DATABASE IF EXISTS employees_db;

-- Creates a new database
CREATE DATABASE employees_db;

-- Calls the database
\c employees_db

--Below are the parameters for each of the 3 different databases. 
CREATE Table department(
    id: SERIAL PRIMARY KEY,
    department_name: VARCHAR(30) UNIQUE NOT NULL
);

CREATE Table role(
    id:SERIAL PRIMARY Key,
    role_title: VARCHAR(30) UNIQUE NOT NULL,
    salary:DECIMAL NOT NULL,
    department_id: INTEGER NOT NULL REFERENCES department(id)
);

CREATE Table employee(
    id: SERIAL PRIMARY KEY,
    first_name: VARCHAR(30)NOT NULL,
    last_name: VARCHAR(30)NOT NULL,
    role_id: INTEGER NOT NULL REFERENCES role(id),
    manager_id:INTEGER REFERENCES employee(id)
);