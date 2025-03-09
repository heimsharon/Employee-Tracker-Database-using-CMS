-- This file allows the deletion of a department, role or employee

-- Allows deletion of a department
DELETE FROM department
WHERE id = $1;

-- Allows deletion of a role
DELETE FROM role
WHERE id = $1;

-- Allows deletion of an employee
DELETE FROM employee
WHERE id = $1;