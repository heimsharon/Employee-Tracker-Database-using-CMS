// filepath: src/operations/viewOperations.ts
// This file contains functions to view all departments, employees, roles, and employees by department or manager.
import { DatabaseService } from '../database/databaseServices';
import { displayTableWithoutIndex } from '../services/utils/displayTable';
import { colorDepartmentName, colorRoleName, colorSalary, colorEmployeeName } from '../services/utils/colorUtils';
import chalk from 'chalk';
import { Role, Department } from '../database/roleServices';

// View all departments in the database
export async function viewAllDepartments(departmentService: DatabaseService['departmentService']) {
    const departments = await departmentService.getAllDepartments(); // Fetch all departments
    console.log(chalk.blue('All Departments:'));
    displayTableWithoutIndex(departments.map(department => ({
        'Department ID': department.id,
        'Department Name': colorDepartmentName(department.department_name)
    }))); // Display departments in a table
}

// View all employees with their roles, departments, salaries, and managers
export async function viewAllEmployees(
    employeeService: DatabaseService['employeeService'],
    roleService: DatabaseService['roleService'],
    departmentService: DatabaseService['departmentService']
) {
    const employees = await employeeService.getAllEmployees(); // Fetch all employees
    const rolesForEmployees = await roleService.getAllRoles(); // Fetch all roles
    const departmentsForEmployees = await departmentService.getAllDepartments(); // Fetch all departments
    const employeesWithDetails = employees.map(employee => {
        const role = rolesForEmployees.find((role: Role) => role.id === employee.role_id); // Find role for employee
        const department = role ? departmentsForEmployees.find((dept: Department) => dept.id === role.department_id) : null; // Find department for role
        const manager = employees.find(emp => emp.id === employee.manager_id); // Find manager for employee
        return {
            'Employee ID': employee.id,
            'First Name': colorEmployeeName(employee.first_name),
            'Last Name': colorEmployeeName(employee.last_name),
            'Job Title': role ? colorRoleName(role.role_title) : 'Unknown',
            'Department': department ? colorDepartmentName(department.department_name) : 'Unknown',
            'Salary': role ? colorSalary(role.salary) : 'Unknown',
            'Manager': manager ? colorEmployeeName(`${manager.first_name} ${manager.last_name}`) : 'None'
        };
    });
    console.log(chalk.blue('All Employees:'));
    displayTableWithoutIndex(employeesWithDetails); // Display employees in a table
}

// View employees grouped by department
export async function viewEmployeesByDepartment(employeeService: DatabaseService['employeeService']) {
    const employeesByDepartment = await employeeService.getEmployeesByDepartment(); // Fetch employees by department
    console.log(chalk.blue('Employees by Department:'));
    displayTableWithoutIndex(employeesByDepartment.map(employee => ({
        'Employee ID': employee.id,
        'First Name': colorEmployeeName(employee.first_name),
        'Last Name': colorEmployeeName(employee.last_name),
        'Department': colorDepartmentName(employee.department_name)
    }))); // Display employees by department in a table
}

// View employees grouped by manager
export async function viewEmployeesByManager(employeeService: DatabaseService['employeeService']) {
    const employeesByManager = await employeeService.getEmployeesByManager(); // Fetch employees by manager
    console.log(chalk.blue('Employees by Manager:'));
    displayTableWithoutIndex(employeesByManager.map(employee => ({
        'Employee ID': employee.id,
        'First Name': colorEmployeeName(employee.first_name),
        'Last Name': colorEmployeeName(employee.last_name),
        'Manager': colorEmployeeName(employee.manager)
    }))); // Display employees by manager in a table
}

// View all roles with their departments and salaries
export async function viewAllRoles(
    roleService: DatabaseService['roleService'],
    departmentService: DatabaseService['departmentService']
) {
    const roles = await roleService.getAllRoles(); // Fetch all roles
    const departmentsForRoles = await departmentService.getAllDepartments(); // Fetch all departments
    const rolesWithDepartments = roles.map(role => {
        const department = departmentsForRoles.find((dept: Department) => dept.id === role.department_id); // Find department for role
        return {
            'Role ID': role.id,
            'Job Title': colorRoleName(role.role_title),
            'Department': department ? colorDepartmentName(department.department_name) : 'Unknown',
            'Salary': colorSalary(role.salary)
        };
    });
    console.log(chalk.blue('All Roles:'));
    displayTableWithoutIndex(rolesWithDepartments); // Display roles in a table
}