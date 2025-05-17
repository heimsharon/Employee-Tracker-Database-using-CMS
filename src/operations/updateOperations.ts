// filepath: src/operations/updateOperations.ts
// This file contains functions to update existing employee data in the database, including their manager.
import { DatabaseService } from '../database/databaseServices';
import { promptForUpdateEmployeeRole, promptForUpdateEmployeeManager } from '../services/updateEmployeePrompt';
import chalk from 'chalk';

// Updates an employee's role after prompting the user
export async function updateEmployeeRole(employeeService: DatabaseService['employeeService'], roleService: DatabaseService['roleService']) {
    const allEmployeesForRoleUpdate = await employeeService.getAllEmployees(); // Fetch all employees
    const allRolesForRoleUpdate = await roleService.getAllRoles(); // Fetch all roles
    const updateRoleDetails = await promptForUpdateEmployeeRole(allEmployeesForRoleUpdate, allRolesForRoleUpdate); // Prompt user for employee and new role
    await employeeService.updateEmployeeRole(parseInt(updateRoleDetails.employeeId), parseInt(updateRoleDetails.roleId)); // Update employee's role
    console.log(chalk.green('Updated employee role')); // Success message
}

// Updates an employee's manager after prompting the user
export async function updateEmployeeManager(employeeService: DatabaseService['employeeService']) {
    const allEmployeesForManagerUpdate = await employeeService.getAllEmployees(); // Fetch all employees
    const updateManagerDetails = await promptForUpdateEmployeeManager(allEmployeesForManagerUpdate); // Prompt user for employee and new manager
    await employeeService.updateEmployeeManager(
        parseInt(updateManagerDetails.employeeId),
        updateManagerDetails.managerId !== null ? parseInt(updateManagerDetails.managerId) : null
    ); // Update employee's manager
    console.log(chalk.green('Updated employee manager')); // Success message
}