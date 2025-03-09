--This page is allows to insert new rows to the existing tables.

--Adds a department
INSERT INTO
    department (department_name)
VALUES
    (NULL);

--Adds a role
INSERT INTO
    role (role_title, salary, department_id)
VALUES
    (NULL, NULL, NULL, NULL);

--Adds an employee
INSERT INTO
    employee (first_name, last_name, role_id, manager_id)
VALUES
    (NULL, NULL, NULL, NULL);