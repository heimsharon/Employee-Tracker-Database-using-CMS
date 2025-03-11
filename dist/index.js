"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const dotenv_1 = require("dotenv");
const databaseServices_1 = require("./databaseServices");
const prompts_1 = require("./services/prompts");
const addDepartmentPrompt_1 = require("./services/addDepartmentPrompt");
const addRolePrompt_1 = require("./services/addRolePrompt");
const addEmployeePrompt_1 = require("./services/addEmployeePrompt");
const updateEmployeePrompt_1 = require("./services/updateEmployeePrompt");
const deletePrompts_1 = require("./services/deletePrompts");
const chalk_1 = __importDefault(require("chalk"));
const inquirer_1 = __importDefault(require("inquirer"));
const cli_table3_1 = __importDefault(require("cli-table3"));
(0, dotenv_1.config)(); // Load environment variables from .env file
const dbConfig = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || '5432', 10),
};
// Function to display ASCII art with color
function displayAsciiArt() {
    const asciiArt = `
${chalk_1.default.blue('+----------------------------------+')}
${chalk_1.default.blue('|')}                                  ${chalk_1.default.blue('|')}
${chalk_1.default.blue('|')}      ${chalk_1.default.green('Employee Tracker App')}        ${chalk_1.default.blue('|')}
${chalk_1.default.blue('|')}                                  ${chalk_1.default.blue('|')}
${chalk_1.default.blue('+----------------------------------+')}
  `;
    console.log(asciiArt);
}
// Custom function to display table without index column using cli-table3
function displayTableWithoutIndex(data) {
    if (data.length === 0) {
        console.log('No data available.');
        return;
    }
    const headers = Object.keys(data[0]);
    const table = new cli_table3_1.default({
        head: headers,
        colWidths: headers.map(() => 20),
    });
    data.forEach(row => {
        table.push(headers.map(header => row[header]));
    });
    console.log(table.toString());
}
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const pool = new pg_1.Pool(dbConfig);
        const dbService = new databaseServices_1.DatabaseService(pool);
        try {
            yield pool.connect();
            // Display the ASCII art when the app starts
            displayAsciiArt();
            let exit = false;
            while (!exit) {
                const action = yield (0, prompts_1.mainMenu)();
                switch (action) {
                    case 'View All Departments':
                        const departments = yield dbService.getAllDepartments();
                        console.log(chalk_1.default.blue('All Departments:'));
                        displayTableWithoutIndex(departments.map(department => ({
                            'Department ID': department.id,
                            'Department Name': department.department_name
                        })));
                        break;
                    case 'View All Employees':
                        const employees = yield dbService.getAllEmployees();
                        const rolesForEmployees = yield dbService.getAllRoles();
                        const departmentsForEmployees = yield dbService.getAllDepartments();
                        const employeesWithDetails = employees.map(employee => {
                            const role = rolesForEmployees.find(role => role.id === employee.role_id);
                            const department = role ? departmentsForEmployees.find(dept => dept.id === role.department_id) : null;
                            const manager = employees.find(emp => emp.id === employee.manager_id);
                            return {
                                'Employee ID': employee.id,
                                'First Name': employee.first_name,
                                'Last Name': employee.last_name,
                                'Job Title': role ? role.role_title : 'Unknown',
                                'Department': department ? department.department_name : 'Unknown',
                                'Salary': role ? role.salary : 'Unknown',
                                'Manager': manager ? `${manager.first_name} ${manager.last_name}` : 'None'
                            };
                        });
                        console.log(chalk_1.default.blue('All Employees:'));
                        displayTableWithoutIndex(employeesWithDetails);
                        break;
                    case 'View Employees by Department':
                        const employeesByDepartment = yield dbService.getEmployeesByDepartment();
                        console.log(chalk_1.default.blue('Employees by Department:'));
                        displayTableWithoutIndex(employeesByDepartment);
                        break;
                    case 'View Employees by Manager':
                        const employeesByManager = yield dbService.getEmployeesByManager();
                        console.log(chalk_1.default.blue('Employees by Manager:'));
                        displayTableWithoutIndex(employeesByManager);
                        break;
                    case 'View All Roles':
                        const roles = yield dbService.getAllRoles();
                        const departmentsForRoles = yield dbService.getAllDepartments();
                        const rolesWithDepartments = roles.map(role => {
                            const department = departmentsForRoles.find(dept => dept.id === role.department_id);
                            return {
                                'Role ID': role.id,
                                'Job Title': role.role_title,
                                'Department': department ? department.department_name : 'Unknown',
                                'Salary': role.salary
                            };
                        });
                        console.log(chalk_1.default.blue('All Roles:'));
                        displayTableWithoutIndex(rolesWithDepartments);
                        break;
                    case 'View Total Utilized Budget of a Department':
                        const allDepartmentsForBudget = yield dbService.getAllDepartments();
                        const departmentChoices = allDepartmentsForBudget.map(department => ({
                            name: `${department.department_name} (ID: ${department.id})`,
                            value: department.id
                        }));
                        const budgetAnswers = yield inquirer_1.default.prompt([
                            {
                                type: 'list',
                                name: 'departmentId',
                                message: 'Select the department to view the total utilized budget:',
                                choices: departmentChoices
                            }
                        ]);
                        const totalBudget = yield dbService.getTotalUtilizedBudget(budgetAnswers.departmentId);
                        console.log(chalk_1.default.blue(`Total Utilized Budget for ${totalBudget.Department}:`));
                        console.log(`$${totalBudget['Total Utilized Budget']}`);
                        break;
                    case 'Add Department':
                        const departmentName = yield (0, addDepartmentPrompt_1.promptForDepartmentName)();
                        yield dbService.addDepartment(departmentName);
                        console.log(chalk_1.default.green('Added new department'));
                        break;
                    case 'Add Role':
                        const existingDepartments = yield dbService.getAllDepartments();
                        const roleDetails = yield (0, addRolePrompt_1.promptForRoleDetails)(existingDepartments);
                        yield dbService.addRole(roleDetails.roleTitle, parseFloat(roleDetails.salary), parseInt(roleDetails.departmentId));
                        console.log(chalk_1.default.green('Added new role'));
                        break;
                    case 'Add Employee':
                        const existingRoles = yield dbService.getAllRoles();
                        const existingEmployees = yield dbService.getAllEmployees();
                        const employeeDetails = yield (0, addEmployeePrompt_1.promptForEmployeeDetails)(existingRoles, existingEmployees);
                        yield dbService.addEmployee(employeeDetails.firstName, employeeDetails.lastName, parseInt(employeeDetails.roleId), employeeDetails.managerId);
                        console.log(chalk_1.default.green('Added new employee'));
                        break;
                    case 'Update Employee Role':
                        const allEmployeesForRoleUpdate = yield dbService.getAllEmployees();
                        const allRolesForRoleUpdate = yield dbService.getAllRoles();
                        const updateRoleDetails = yield (0, updateEmployeePrompt_1.promptForUpdateEmployeeRole)(allEmployeesForRoleUpdate, allRolesForRoleUpdate);
                        yield dbService.updateEmployeeRole(parseInt(updateRoleDetails.employeeId), parseInt(updateRoleDetails.roleId));
                        console.log(chalk_1.default.green('Updated employee role'));
                        break;
                    case 'Update Employee Manager':
                        const allEmployeesForManagerUpdate = yield dbService.getAllEmployees();
                        const updateManagerDetails = yield (0, updateEmployeePrompt_1.promptForUpdateEmployeeManager)(allEmployeesForManagerUpdate);
                        yield dbService.updateEmployeeManager(parseInt(updateManagerDetails.employeeId), updateManagerDetails.managerId !== null ? parseInt(updateManagerDetails.managerId) : null);
                        console.log(chalk_1.default.green('Updated employee manager'));
                        break;
                    case 'Delete Department':
                        const allDepartments = yield dbService.getAllDepartments();
                        const { departmentId, confirmDelete } = yield (0, deletePrompts_1.promptForDeleteDepartment)(allDepartments);
                        if (confirmDelete) {
                            try {
                                yield dbService.deleteDepartment(parseInt(departmentId));
                                console.log(chalk_1.default.green('Deleted department'));
                            }
                            catch (error) {
                                if (error instanceof Error) {
                                    console.error(chalk_1.default.red(`Failed to delete department with ID ${departmentId}: ${error.message}`));
                                }
                                else {
                                    console.error(chalk_1.default.red('Unknown error'), error);
                                }
                            }
                        }
                        else {
                            console.log(chalk_1.default.yellow('Deletion cancelled.'));
                        }
                        break;
                    case 'Delete Role':
                        const allRoles = yield dbService.getAllRoles();
                        const { roleId, confirmDeleteRole } = yield (0, deletePrompts_1.promptForDeleteRole)(allRoles);
                        if (confirmDeleteRole) {
                            try {
                                yield dbService.deleteRole(parseInt(roleId));
                                console.log(chalk_1.default.green('Deleted role'));
                            }
                            catch (error) {
                                if (error instanceof Error) {
                                    console.error(chalk_1.default.red(`Failed to delete role with ID ${roleId}: ${error.message}`));
                                }
                                else {
                                    console.error(chalk_1.default.red('Unknown error'), error);
                                }
                            }
                        }
                        else {
                            console.log(chalk_1.default.yellow('Deletion cancelled.'));
                        }
                        break;
                    case 'Delete Employee':
                        const allEmployees = yield dbService.getAllEmployees();
                        const { employeeId, confirmDeleteEmployee } = yield (0, deletePrompts_1.promptForDeleteEmployee)(allEmployees);
                        if (confirmDeleteEmployee) {
                            try {
                                yield dbService.deleteEmployee(parseInt(employeeId));
                                console.log(chalk_1.default.green('Deleted employee'));
                            }
                            catch (error) {
                                if (error instanceof Error) {
                                    console.error(chalk_1.default.red(`Failed to delete employee with ID ${employeeId}: ${error.message}`));
                                }
                                else {
                                    console.error(chalk_1.default.red('Unknown error'), error);
                                }
                            }
                        }
                        else {
                            console.log(chalk_1.default.yellow('Deletion cancelled.'));
                        }
                        break;
                    case 'Exit':
                        exit = true;
                        break;
                }
            }
        }
        catch (error) {
            if (error instanceof Error) {
                console.error(chalk_1.default.red('Error:'), chalk_1.default.red(error.message));
            }
            else {
                console.error(chalk_1.default.red('Unknown error:'), error);
            }
        }
        finally {
            yield pool.end();
        }
    });
}
main();
