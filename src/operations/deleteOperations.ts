import { DatabaseService } from '../databaseServices';
import { promptForDeleteDepartment, promptForDeleteRole, promptForDeleteEmployee } from '../services/deletePrompts';
import chalk from 'chalk';

export async function deleteDepartment(dbService: DatabaseService) {
    const allDepartments = await dbService.getAllDepartments();
    const { departmentId, confirmDelete } = await promptForDeleteDepartment(allDepartments);
    if (confirmDelete) {
        try {
            await dbService.deleteDepartment(parseInt(departmentId));
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

export async function deleteRole(dbService: DatabaseService) {
    const allRoles = await dbService.getAllRoles();
    const { roleId, confirmDeleteRole } = await promptForDeleteRole(allRoles);
    if (confirmDeleteRole) {
        try {
            await dbService.deleteRole(parseInt(roleId));
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

export async function deleteEmployee(dbService: DatabaseService) {
    const allEmployees = await dbService.getAllEmployees();
    const { employeeId, confirmDeleteEmployee } = await promptForDeleteEmployee(allEmployees);
    if (confirmDeleteEmployee) {
        try {
            await dbService.deleteEmployee(parseInt(employeeId));
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