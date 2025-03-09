-- This file allow updates to the employee's role and/or manager.

-- Allows updates to  employee's role
UPDATE employee
SET role_id = $1
WHERE id = $2;

-- Allows updates to employee's manager
UPDATE employee
SET manager_id = $1
WHERE id = $2;