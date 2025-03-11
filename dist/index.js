"use strict";
// This is the file the application runs from, as in complies all the supporting files. 
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
const databaseServices_1 = require("./database/databaseServices");
const prompts_1 = require("./services/prompts");
const asciiArt_1 = require("./services/utils/asciiArt");
const addOperations_1 = require("./operations/addOperations");
const updateOperations_1 = require("./operations/updateOperations");
const deleteOperations_1 = require("./operations/deleteOperations");
const viewOperations_1 = require("./operations/viewOperations");
const inquirer_1 = __importDefault(require("inquirer"));
const chalk_1 = __importDefault(require("chalk"));
(0, dotenv_1.config)(); // Load environment variables from .env file
const dbConfig = {
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || '5432', 10),
};
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const pool = new pg_1.Pool(dbConfig);
        const dbService = new databaseServices_1.DatabaseService(pool);
        try {
            yield pool.connect();
            // Display the ASCII art when the app starts
            (0, asciiArt_1.displayAsciiArt)();
            // Prompt methods for the application
            let exit = false;
            while (!exit) {
                const action = yield (0, prompts_1.mainMenu)();
                switch (action) {
                    case 'View All Departments':
                        yield (0, viewOperations_1.viewAllDepartments)(dbService.departmentService);
                        break;
                    case 'View All Employees':
                        yield (0, viewOperations_1.viewAllEmployees)(dbService.employeeService, dbService.roleService, dbService.departmentService);
                        break;
                    case 'View Employees by Department':
                        yield (0, viewOperations_1.viewEmployeesByDepartment)(dbService.employeeService);
                        break;
                    case 'View Employees by Manager':
                        yield (0, viewOperations_1.viewEmployeesByManager)(dbService.employeeService);
                        break;
                    case 'View All Roles':
                        yield (0, viewOperations_1.viewAllRoles)(dbService.roleService, dbService.departmentService);
                        break;
                    case 'View Total Utilized Budget of a Department':
                        const allDepartmentsForBudget = yield dbService.departmentService.getAllDepartments();
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
                        const totalBudget = yield dbService.departmentService.getTotalUtilizedBudget(budgetAnswers.departmentId);
                        console.log(chalk_1.default.blue(`Total Utilized Budget for ${totalBudget.Department}:`));
                        console.log(`$${totalBudget['Total Utilized Budget']}`);
                        break;
                    case 'Add Department':
                        yield (0, addOperations_1.addDepartment)(dbService.departmentService);
                        break;
                    case 'Add Role':
                        yield (0, addOperations_1.addRole)(dbService.roleService, dbService.departmentService);
                        break;
                    case 'Add Employee':
                        yield (0, addOperations_1.addEmployee)(dbService.employeeService, dbService.roleService);
                        break;
                    case 'Update Employee Role':
                        yield (0, updateOperations_1.updateEmployeeRole)(dbService.employeeService, dbService.roleService);
                        break;
                    case 'Update Employee Manager':
                        yield (0, updateOperations_1.updateEmployeeManager)(dbService.employeeService);
                        break;
                    case 'Delete Department':
                        yield (0, deleteOperations_1.deleteDepartment)(dbService.departmentService);
                        break;
                    case 'Delete Role':
                        yield (0, deleteOperations_1.deleteRole)(dbService.roleService);
                        break;
                    case 'Delete Employee':
                        yield (0, deleteOperations_1.deleteEmployee)(dbService.employeeService);
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
