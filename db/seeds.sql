-- This file can be used for testing and etc; it populates data to the original tables.

-- Inserts data to departments table
INSERT INTO department (department_name)
VALUES  ('Human Resources'),
        ('Engineering'),
        ('Sales'),
        ('Marketing'),
        ('Finance'),
        ('Operations'),
        ('R&D');

-- Inserts data to roles table
INSERT INTO role (role_title, salary, department_id)
VALUES  ('HR Manager', 75000, 1),
        ('Software Engineer', 90000, 2),
        ('Sales Manager', 65000, 3),
        ('Marketing Specialist', 55000, 4),
        ('Finance Analyst', 70000, 5),
        ('Operations Supervisor', 69000, 6),
        ('Research Scientist', 80000, 7);

-- Inserts data to employees table
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ('Alice', 'Johnson', 1, NULL), -- HR Manager
        ('Bob', 'Smith', 2, NULL), -- Software Engineer
        ('Charlie', 'Brown', 3, NULL), -- Sales Manager
        ('Daisy', 'Miller', 4, NULL), -- Marketing Specialist
        ('Evan', 'Williams', 5, NULL), -- Finance Analyst
        ('Fiona', 'Clark', 6, NULL), -- Operations Supervisor
        ('George', 'Anderson', 7, NULL), -- Research Scientist
        ('Hannah', 'Taylor', 2, 2), -- Software Engineer under Bob
        ('Ian', 'Davis', 2, 2), -- Software Engineer under Bob
        ('Julia', 'Roberts', 3, 3), -- Salesperson under Charlie
        ('Karen', 'White', 2, 2), -- Software Engineer under Bob
        ('Liam', 'Johnson', 2, 2); -- Software Engineer under Bob