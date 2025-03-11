import { DatabaseService } from '../databaseServices';
import { promptForUpdateEmployeeRole, promptForUpdateEmployeeManager } from '../services/updateEmployeePrompt';
import chalk from 'chalk';

export async function updateEmployeeRole(dbService: DatabaseService) {
    const allEmployeesForRoleUpdate = await dbService.getAllEmployees();
    const allRolesForRoleUpdate = await dbService.getAllRoles();
    const updateRoleDetails = await promptForUpdateEmployeeRole(allEmployeesForRoleUpdate, allRolesForRoleUpdate);
    await dbService.updateEmployeeRole(parseInt(updateRoleDetails.employeeId), parseInt(updateRoleDetails.roleId));
    console.log(chalk.green('Updated employee role'));
}

export async function updateEmployeeManager(dbService: DatabaseService) {
    const allEmployeesForManagerUpdate = await dbService.getAllEmployees();
    const updateManagerDetails = await promptForUpdateEmployeeManager(allEmployeesForManagerUpdate);
    await dbService.updateEmployeeManager(parseInt(updateManagerDetails.employeeId), updateManagerDetails.managerId !== null ? parseInt(updateManagerDetails.managerId) : null);
    console.log(chalk.green('Updated employee manager'));
}