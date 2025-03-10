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
exports.promptForDeleteEmployee = exports.promptForDeleteRole = exports.promptForDeleteDepartment = void 0;
const inquirer_1 = __importDefault(require("inquirer"));
const databaseServices_1 = require("../databaseServices");
const pg_1 = require("pg");
const pool = new pg_1.Pool({
    user: 'heimsharon',
    host: 'localhost',
    database: 'employees_db',
    password: 'Thisisstupid11',
    port: 5432,
});
const dbService = new databaseServices_1.DatabaseService(pool);
function promptForDeleteDepartment(departments) {
    return __awaiter(this, void 0, void 0, function* () {
        const departmentChoices = departments.map(department => ({ name: `${department.department_name} (ID: ${department.id})`, value: department.id }));
        const answers = yield inquirer_1.default.prompt([
            {
                type: 'list',
                name: 'departmentId',
                message: 'Select the department to delete:',
                choices: departmentChoices
            },
            {
                type: 'confirm',
                name: 'confirmDelete',
                message: 'Deleting this department will also delete all associated roles. Are you sure?',
                default: false
            }
        ]);
        if (answers.confirmDelete) {
            const departmentId = answers.departmentId;
            try {
                // Get all roles associated with the department
                const roles = yield dbService.getRolesByDepartment(departmentId);
                // Delete all employees associated with each role
                for (const role of roles) {
                    yield dbService.deleteEmployeesByRole(role.id);
                }
                // Delete all roles associated with the department
                for (const role of roles) {
                    yield dbService.deleteRole(role.id);
                }
                // Delete the department
                yield dbService.deleteDepartment(departmentId);
                console.log(`Department with ID ${departmentId} has been deleted.`);
            }
            catch (error) {
                if (error instanceof Error) {
                    console.error(`Failed to delete department with ID ${departmentId}:`, error.message);
                }
                else {
                    console.error(`Failed to delete department with ID ${departmentId}:`, error);
                }
            }
            return departmentId;
        }
        else {
            console.log('Deletion cancelled.');
            return null;
        }
    });
}
exports.promptForDeleteDepartment = promptForDeleteDepartment;
function promptForDeleteRole(roles) {
    return __awaiter(this, void 0, void 0, function* () {
        const roleChoices = roles.map(role => ({ name: `${role.role_title} (ID: ${role.id})`, value: role.id }));
        const answers = yield inquirer_1.default.prompt([
            {
                type: 'list',
                name: 'roleId',
                message: 'Select the role to delete:',
                choices: roleChoices
            },
            {
                type: 'confirm',
                name: 'confirmDelete',
                message: 'Deleting this role will also delete all associated employees. Are you sure?',
                default: false
            }
        ]);
        if (answers.confirmDelete) {
            const roleId = answers.roleId;
            try {
                yield dbService.deleteRole(roleId);
                console.log(`Role with ID ${roleId} has been deleted.`);
            }
            catch (error) {
                if (error instanceof Error) {
                    console.error(`Failed to delete role with ID ${roleId}:`, error.message);
                }
                else {
                    console.error(`Failed to delete role with ID ${roleId}:`, error);
                }
            }
            return roleId;
        }
        else {
            console.log('Deletion cancelled.');
            return null;
        }
    });
}
exports.promptForDeleteRole = promptForDeleteRole;
function promptForDeleteEmployee(employees) {
    return __awaiter(this, void 0, void 0, function* () {
        const employeeChoices = employees.map(employee => ({ name: `${employee.first_name} ${employee.last_name} (ID: ${employee.id})`, value: employee.id }));
        const answers = yield inquirer_1.default.prompt([
            {
                type: 'list',
                name: 'employeeId',
                message: 'Select the employee to delete:',
                choices: employeeChoices
            },
            {
                type: 'confirm',
                name: 'confirmDelete',
                message: 'Are you sure you want to delete this employee?',
                default: false
            }
        ]);
        if (answers.confirmDelete) {
            const employeeId = answers.employeeId;
            try {
                yield dbService.deleteEmployee(employeeId);
                console.log(`Employee with ID ${employeeId} has been deleted.`);
            }
            catch (error) {
                if (error instanceof Error) {
                    console.error(`Failed to delete employee with ID ${employeeId}:`, error.message);
                }
                else {
                    console.error(`Failed to delete employee with ID ${employeeId}:`, error);
                }
            }
            return employeeId;
        }
        else {
            console.log('Deletion cancelled.');
            return null;
        }
    });
}
exports.promptForDeleteEmployee = promptForDeleteEmployee;
