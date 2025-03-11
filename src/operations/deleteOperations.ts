// This file contains functions to delete departments, roles, and employees from the database. 

import { DatabaseService } from '../database/databaseServices';
import { promptForDeleteDepartment, promptForDeleteRole, promptForDeleteEmployee } from '../services/deletePrompts';
import chalk from 'chalk';

export async function deleteDepartment(departmentService: DatabaseService['departmentService']) {
    const allDepartments = await departmentService.getAllDepartments();
    const { departmentId, confirmDelete } = await promptForDeleteDepartment(allDepartments);
    if (confirmDelete) {
        try {
            await departmentService.deleteDepartment(parseInt(departmentId));
            console.log(chalk.green('Deleted department'));
        } catch (error) {
            if (error instanceof Error) {
                console.error(chalk.red(`Failed to delete department with ID ${departmentId}: ${error.message}`));
            } else {
                console.error(chalk.red('Unknown error'), error);
            }
        }
    } else {
        console.log(chalk.yellow('Deletion cancelled.'));
    }
}

export async function deleteRole(roleService: DatabaseService['roleService']) {
    const allRoles = await roleService.getAllRoles();
    const { roleId, confirmDeleteRole } = await promptForDeleteRole(allRoles);
    if (confirmDeleteRole) {
        try {
            await roleService.deleteRole(parseInt(roleId));
            console.log(chalk.green('Deleted role'));
        } catch (error) {
            if (error instanceof Error) {
                console.error(chalk.red(`Failed to delete role with ID ${roleId}: ${error.message}`));
            } else {
                console.error(chalk.red('Unknown error'), error);
            }
        }
    } else {
        console.log(chalk.yellow('Deletion cancelled.'));
    }
}

export async function deleteEmployee(employeeService: DatabaseService['employeeService']) {
    const allEmployees = await employeeService.getAllEmployees();
    const { employeeId, confirmDeleteEmployee } = await promptForDeleteEmployee(allEmployees);
    if (confirmDeleteEmployee) {
        try {
            await employeeService.deleteEmployee(parseInt(employeeId));
            console.log(chalk.green('Deleted employee'));
        } catch (error) {
            if (error instanceof Error) {
                console.error(chalk.red(`Failed to delete employee with ID ${employeeId}: ${error.message}`));
            } else {
                console.error(chalk.red('Unknown error'), error);
            }
        }
    } else {
        console.log(chalk.yellow('Deletion cancelled.'));
    }
}