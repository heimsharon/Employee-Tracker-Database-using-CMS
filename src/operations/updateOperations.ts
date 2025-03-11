// This file contains functions to update existing employee data in the database, including their manager. 

import { DatabaseService } from '../database/databaseServices';
import { promptForUpdateEmployeeRole, promptForUpdateEmployeeManager } from '../services/updateEmployeePrompt';
import chalk from 'chalk';

export async function updateEmployeeRole(employeeService: DatabaseService['employeeService'], roleService: DatabaseService['roleService']) {
    const allEmployeesForRoleUpdate = await employeeService.getAllEmployees();
    const allRolesForRoleUpdate = await roleService.getAllRoles();
    const updateRoleDetails = await promptForUpdateEmployeeRole(allEmployeesForRoleUpdate, allRolesForRoleUpdate);
    await employeeService.updateEmployeeRole(parseInt(updateRoleDetails.employeeId), parseInt(updateRoleDetails.roleId));
    console.log(chalk.green('Updated employee role'));
}

export async function updateEmployeeManager(employeeService: DatabaseService['employeeService']) {
    const allEmployeesForManagerUpdate = await employeeService.getAllEmployees();
    const updateManagerDetails = await promptForUpdateEmployeeManager(allEmployeesForManagerUpdate);
    await employeeService.updateEmployeeManager(parseInt(updateManagerDetails.employeeId), updateManagerDetails.managerId !== null ? parseInt(updateManagerDetails.managerId) : null);
    console.log(chalk.green('Updated employee manager'));
}