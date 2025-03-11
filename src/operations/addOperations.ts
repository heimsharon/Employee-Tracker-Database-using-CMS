import { DatabaseService } from '../database/databaseServices';
import { promptForDepartmentName } from '../services/addDepartmentPrompt';
import { promptForRoleDetails } from '../services/addRolePrompt';
import { promptForEmployeeDetails } from '../services/addEmployeePrompt';
import chalk from 'chalk';

export async function addDepartment(departmentService: DatabaseService['departmentService']) {
    const departmentName = await promptForDepartmentName();
    const existingDepartments = await departmentService.getAllDepartments();
    await departmentService.addDepartment(departmentName);
    console.log(chalk.green('Added new department'));
}

export async function addRole(roleService: DatabaseService['roleService'], departmentService: DatabaseService['departmentService']) {
    const existingDepartments = await departmentService.getAllDepartments();
    const existingRoles = await roleService.getAllRoles();
    const roleDetails = await promptForRoleDetails(existingDepartments);
    await roleService.addRole(roleDetails.roleTitle, parseFloat(roleDetails.salary), parseInt(roleDetails.departmentId));
    console.log(chalk.green('Added new role'));
}

export async function addEmployee(employeeService: DatabaseService['employeeService'], roleService: DatabaseService['roleService']) {
    const existingRoles = await roleService.getAllRoles();
    const existingEmployees = await employeeService.getAllEmployees();
    const employeeDetails = await promptForEmployeeDetails(existingRoles, existingEmployees);
    await employeeService.addEmployee(employeeDetails.firstName, employeeDetails.lastName, parseInt(employeeDetails.roleId), employeeDetails.managerId);
    console.log(chalk.green('Added new employee'));
}