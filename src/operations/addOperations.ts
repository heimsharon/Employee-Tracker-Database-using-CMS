import { DatabaseService } from '../databaseServices';
import { promptForDepartmentName } from '../services/addDepartmentPrompt';
import { promptForRoleDetails } from '../services/addRolePrompt';
import { promptForEmployeeDetails } from '../services/addEmployeePrompt';
import chalk from 'chalk';

export async function addDepartment(dbService: DatabaseService) {
    const departmentName = await promptForDepartmentName();
    await dbService.addDepartment(departmentName);
    console.log(chalk.green('Added new department'));
}

export async function addRole(dbService: DatabaseService) {
    const existingDepartments = await dbService.getAllDepartments();
    const roleDetails = await promptForRoleDetails(existingDepartments);
    await dbService.addRole(roleDetails.roleTitle, parseFloat(roleDetails.salary), parseInt(roleDetails.departmentId));
    console.log(chalk.green('Added new role'));
}

export async function addEmployee(dbService: DatabaseService) {
    const existingRoles = await dbService.getAllRoles();
    const existingEmployees = await dbService.getAllEmployees();
    const employeeDetails = await promptForEmployeeDetails(existingRoles, existingEmployees);
    await dbService.addEmployee(employeeDetails.firstName, employeeDetails.lastName, parseInt(employeeDetails.roleId), employeeDetails.managerId);
    console.log(chalk.green('Added new employee'));
}