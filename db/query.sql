-- This file sets up the ability to collect data from existing tables and display them based on the preset parameters.

-- View all departments
SELECT
    department.department_name, 
    department.id AS department_id
FROM 
    department;

-- View all employees
SELECT 
    employee.id, 
    employee.first_name, 
    employee.last_name, 
    role.role_title, 
    role.department_id, 
    role.salary, 
    employee.manager_id
FROM 
    employee
LEFT JOIN role ON 
    employee.role_id = role.id;

-- View all roles
SELECT 
    role.role_title, 
    role.id AS role_id, 
    department.department_name, 
    role.salary
FROM 
    role
LEFT JOIN 
    department ON role.department_id = department.id;

-- View employees by department
SELECT 
    department.department_name, 
    employee.id AS employee_id, 
    employee.first_name,
    employee.last_name
FROM 
    employee
JOIN role ON 
    employee.role_id = role.id
JOIN 
    department ON role.department_id = department.id
ORDER BY 
    department.department_name, 
    employee.last_name, 
    employee.first_name;

-- View employees by manager
SELECT 
    manager.id AS manager_id,
    manager.first_name AS manager_first_name,
    manager.last_name AS manager_last_name,
    employee.id AS employee_id,
    employee.first_name AS employee_first_name,
    employee.last_name AS employee_last_name
FROM 
    employee
LEFT JOIN 
    employee AS manager ON employee.manager_id = manager.id
ORDER BY 
    manager.last_name, 
    manager.first_name, 
    employee.last_name, 
    employee.first_name;

-- View total salary of chosen department
SELECT 
    department.department_name,
    SUM(role.salary) AS total_budget
FROM 
    employee
JOIN 
    role ON employee.role_id = role.id
JOIN 
    department ON role.department_id = department.id
WHERE 
    department.department_name = $1
GROUP BY 
    department.department_name;