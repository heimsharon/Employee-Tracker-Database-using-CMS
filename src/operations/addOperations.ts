// filepath: src/operations/addOperations.ts
// This file contains functions to add new departments, roles, and employees to the database.

import { DatabaseService } from '../database/databaseServices';
import { promptForDepartmentName } from '../services/addDepartmentPrompt';
import { promptForRoleDetails } from '../services/addRolePrompt';
import { promptForEmployeeDetails } from '../services/addEmployeePrompt';
import chalk from 'chalk';

// This function adds a new department to the database.
export async function addDepartment(departmentService: DatabaseService['departmentService']) {
    // Prompt user for department name
    const departmentName = await promptForDepartmentName();
    // Optionally fetch existing departments (not used here)
    const existingDepartments = await departmentService.getAllDepartments();
    // Add the new department to the database
    await departmentService.addDepartment(departmentName);
    // Notify user of success
    console.log(chalk.green('Added new department'));
}

// This function adds a new role to the database.
export async function addRole(roleService: DatabaseService['roleService'], departmentService: DatabaseService['departmentService']) {
    // Fetch existing departments for selection
    const existingDepartments = await departmentService.getAllDepartments();
    // Optionally fetch existing roles (not used here)
    const existingRoles = await roleService.getAllRoles();
    // Prompt user for role details
    const roleDetails = await promptForRoleDetails(existingDepartments);
    // Add the new role to the database
    await roleService.addRole(roleDetails.roleTitle, parseFloat(roleDetails.salary), parseInt(roleDetails.departmentId));
    // Notify user of success
    console.log(chalk.green('Added new role'));
}

// This function adds a new employee to the database.
export async function addEmployee(employeeService: DatabaseService['employeeService'], roleService: DatabaseService['roleService']) {
    // Fetch existing roles for selection
    const existingRoles = await roleService.getAllRoles();
    // Fetch existing employees for manager selection
    const existingEmployees = await employeeService.getAllEmployees();
    // Prompt user for employee details
    const employeeDetails = await promptForEmployeeDetails(existingRoles, existingEmployees);
    // Add the new employee to the database
    await employeeService.addEmployee(employeeDetails.firstName, employeeDetails.lastName, parseInt(employeeDetails.roleId), employeeDetails.managerId);
    // Notify user of success
    console.log(chalk.green('Added new employee'));
}