// This file contains functions to view various data from the database. 
// It includes methods to view all departments, all employees, employees by department, employees by manager, and all roles.

import { DatabaseService } from '../database/databaseServices';
import { displayTableWithoutIndex } from '../services/utils/displayTable';
import { colorDepartmentName, colorRoleName, colorSalary, colorEmployeeName } from '../services/utils/colorUtils';
import chalk from 'chalk';
import { Role, Department } from '../database/roleServices';

export async function viewAllDepartments(departmentService: DatabaseService['departmentService']) {
    const departments = await departmentService.getAllDepartments();
    console.log(chalk.blue('All Departments:'));
    displayTableWithoutIndex(departments.map(department => ({
        'Department ID': department.id,
        'Department Name': colorDepartmentName(department.department_name)
    })));
}

export async function viewAllEmployees(employeeService: DatabaseService['employeeService'], roleService: DatabaseService['roleService'], departmentService: DatabaseService['departmentService']) {
    const employees = await employeeService.getAllEmployees();
    const rolesForEmployees = await roleService.getAllRoles();
    const departmentsForEmployees = await departmentService.getAllDepartments();
    const employeesWithDetails = employees.map(employee => {
        const role = rolesForEmployees.find((role: Role) => role.id === employee.role_id);
        const department = role ? departmentsForEmployees.find((dept: Department) => dept.id === role.department_id) : null;
        const manager = employees.find(emp => emp.id === employee.manager_id);
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
    displayTableWithoutIndex(employeesWithDetails);
}

export async function viewEmployeesByDepartment(employeeService: DatabaseService['employeeService']) {
    const employeesByDepartment = await employeeService.getEmployeesByDepartment();
    console.log(chalk.blue('Employees by Department:'));
    displayTableWithoutIndex(employeesByDepartment.map(employee => ({
        'Employee ID': employee.id,
        'First Name': colorEmployeeName(employee.first_name),
        'Last Name': colorEmployeeName(employee.last_name),
        'Department': colorDepartmentName(employee.department_name)
    })));
}

export async function viewEmployeesByManager(employeeService: DatabaseService['employeeService']) {
    const employeesByManager = await employeeService.getEmployeesByManager();
    console.log(chalk.blue('Employees by Manager:'));
    displayTableWithoutIndex(employeesByManager.map(employee => ({
        'Employee ID': employee.id,
        'First Name': colorEmployeeName(employee.first_name),
        'Last Name': colorEmployeeName(employee.last_name),
        'Manager': colorEmployeeName(employee.manager)
    })));
}

export async function viewAllRoles(roleService: DatabaseService['roleService'], departmentService: DatabaseService['departmentService']) {
    const roles = await roleService.getAllRoles();
    const departmentsForRoles = await departmentService.getAllDepartments();
    const rolesWithDepartments = roles.map(role => {
        const department = departmentsForRoles.find((dept: Department) => dept.id === role.department_id);
        return {
            'Role ID': role.id,
            'Job Title': colorRoleName(role.role_title),
            'Department': department ? colorDepartmentName(department.department_name) : 'Unknown',
            'Salary': colorSalary(role.salary)
        };
    });
    console.log(chalk.blue('All Roles:'));
    displayTableWithoutIndex(rolesWithDepartments);
}