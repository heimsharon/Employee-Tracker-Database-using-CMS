// filepath: src/operations/deleteOperations.ts
// This file contains functions to delete departments, roles, and employees from the database.
import { DatabaseService } from '../database/databaseServices';
import { promptForDeleteDepartment, promptForDeleteRole, promptForDeleteEmployee } from '../services/deletePrompts';
import chalk from 'chalk';

// Deletes a department after user confirmation
export async function deleteDepartment(departmentService: DatabaseService['departmentService']) {

    const allDepartments = await departmentService.getAllDepartments(); // Fetch all departments
    const { departmentId, confirmDelete } = await promptForDeleteDepartment(allDepartments); // Prompt user for department to delete
    if (confirmDelete) {
        try {
            // Check if departmentId is a number
            await departmentService.deleteDepartment(parseInt(departmentId)); // Delete department
            console.log(chalk.green('Deleted department')); // Success message
        } catch (error) {
            if (error instanceof Error) {
                console.error(chalk.red(`Failed to delete department with ID ${departmentId}: ${error.message}`)); // Error message
            } else {
                console.error(chalk.red('Unknown error'), error);
            }
        }
    } else {
        console.log(chalk.yellow('Deletion cancelled.')); // User cancelled deletion
    }
}

// Deletes a role after user confirmation
export async function deleteRole(roleService: DatabaseService['roleService']) {
    const allRoles = await roleService.getAllRoles(); // Fetch all roles
    const { roleId, confirmDeleteRole } = await promptForDeleteRole(allRoles); // Prompt user for role to delete
    if (confirmDeleteRole) {
        try {
            await roleService.deleteRole(parseInt(roleId)); // Delete role
            console.log(chalk.green('Deleted role')); // Success message
        } catch (error) {
            if (error instanceof Error) {
                console.error(chalk.red(`Failed to delete role with ID ${roleId}: ${error.message}`)); // Error message
            } else {
                console.error(chalk.red('Unknown error'), error);
            }
        }
    } else {
        console.log(chalk.yellow('Deletion cancelled.')); // User cancelled deletion
    }
}

// Deletes an employee after user confirmation
export async function deleteEmployee(employeeService: DatabaseService['employeeService']) {
    const allEmployees = await employeeService.getAllEmployees(); // Fetch all employees
    const { employeeId, confirmDeleteEmployee } = await promptForDeleteEmployee(allEmployees); // Prompt user for employee to delete
    if (confirmDeleteEmployee) {
        try {
            await employeeService.deleteEmployee(parseInt(employeeId)); // Delete employee
            console.log(chalk.green('Deleted employee')); // Success message
        } catch (error) {
            if (error instanceof Error) {
                console.error(chalk.red(`Failed to delete employee with ID ${employeeId}: ${error.message}`)); // Error message
            } else {
                console.error(chalk.red('Unknown error'), error);
            }
        }
    } else {
        console.log(chalk.yellow('Deletion cancelled.')); // User cancelled deletion
    }
}