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
const databaseServices_1 = require("./databaseServices");
const prompts_1 = require("./services/prompts");
const addDepartmentPrompt_1 = require("./services/addDepartmentPrompt");
const addRolePrompt_1 = require("./services/addRolePrompt");
const addEmployeePrompt_1 = require("./services/addEmployeePrompt");
const updateEmployeePrompt_1 = require("./services/updateEmployeePrompt");
const deletePrompts_1 = require("./services/deletePrompts");
const chalk_1 = __importDefault(require("chalk"));
const inquirer_1 = __importDefault(require("inquirer"));
const dbConfig = {
    user: 'heimsharon',
    host: 'localhost',
    database: 'employees_db',
    password: 'Thisisstupid11',
    port: 5432,
};
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const pool = new pg_1.Pool(dbConfig);
        const dbService = new databaseServices_1.DatabaseService(pool);
        try {
            yield pool.connect();
            let exit = false;
            while (!exit) {
                const action = yield (0, prompts_1.mainMenu)();
                switch (action) {
                    case 'View All Departments':
                        const departments = yield dbService.getAllDepartments();
                        console.log(chalk_1.default.blue('All Departments:'), departments);
                        break;
                    case 'View All Employees':
                        const employees = yield dbService.getAllEmployees();
                        console.log(chalk_1.default.blue('All Employees:'), employees);
                        break;
                    case 'View All Roles':
                        const roles = yield dbService.getAllRoles();
                        console.log(chalk_1.default.blue('All Roles:'), roles);
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
                        yield dbService.addEmployee(employeeDetails.firstName, employeeDetails.lastName, parseInt(employeeDetails.roleId), employeeDetails.managerId ? parseInt(employeeDetails.managerId) : null);
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
                        const deleteDepartmentId = yield (0, deletePrompts_1.promptForDeleteDepartment)(allDepartments);
                        try {
                            yield dbService.deleteDepartment(parseInt(deleteDepartmentId));
                            console.log(chalk_1.default.green('Deleted department'));
                        }
                        catch (error) {
                            if (error instanceof Error) {
                                console.error(chalk_1.default.red(error.message));
                            }
                            else {
                                console.error(chalk_1.default.red('Unknown error'), error);
                            }
                        }
                        break;
                    case 'Delete Role':
                        const allRoles = yield dbService.getAllRoles();
                        const deleteRoleId = yield (0, deletePrompts_1.promptForDeleteRole)(allRoles);
                        try {
                            yield dbService.deleteRole(parseInt(deleteRoleId));
                            console.log(chalk_1.default.green('Deleted role'));
                        }
                        catch (error) {
                            if (error instanceof Error) {
                                console.error(chalk_1.default.red(error.message));
                            }
                            else {
                                console.error(chalk_1.default.red('Unknown error'), error);
                            }
                        }
                        break;
                    case 'Delete Employee':
                        const allEmployees = yield dbService.getAllEmployees();
                        const deleteEmployeeId = yield (0, deletePrompts_1.promptForDeleteEmployee)(allEmployees);
                        yield dbService.deleteEmployee(parseInt(deleteEmployeeId));
                        console.log(chalk_1.default.green('Deleted employee'));
                        break;
                    case 'View Employees by Manager':
                        const managerId = yield promptForManagerId();
                        const employeesByManager = yield dbService.getEmployeesByManager(managerId);
                        console.log(chalk_1.default.blue('Employees by Manager:'), employeesByManager);
                        break;
                    case 'View Employees by Department':
                        const departmentId = yield promptForDepartmentId();
                        const employeesByDepartment = yield dbService.getEmployeesByDepartment(departmentId);
                        console.log(chalk_1.default.blue('Employees by Department:'), employeesByDepartment);
                        break;
                    case 'View Total Utilized Budget of a Department':
                        const deptId = yield promptForDepartmentId();
                        const totalBudget = yield dbService.getTotalUtilizedBudget(deptId);
                        console.log(chalk_1.default.blue(`Total Utilized Budget: $${totalBudget}`));
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
function promptForManagerId() {
    return __awaiter(this, void 0, void 0, function* () {
        const answers = yield inquirer_1.default.prompt([
            {
                type: 'input',
                name: 'managerId',
                message: 'Enter the manager ID:'
            }
        ]);
        return parseInt(answers.managerId);
    });
}
function promptForDepartmentId() {
    return __awaiter(this, void 0, void 0, function* () {
        const answers = yield inquirer_1.default.prompt([
            {
                type: 'input',
                name: 'departmentId',
                message: 'Enter the department ID:'
            }
        ]);
        return parseInt(answers.departmentId);
    });
}
main();
