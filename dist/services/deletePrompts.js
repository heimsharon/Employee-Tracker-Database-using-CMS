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
        const departmentChoices = departments.map(department => ({
            name: `${department.department_name} (ID: ${department.id})`,
            value: department.id
        }));
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
                message: 'Deleting this department will also delete all roles associated with it. Are you sure? (y/n)',
                default: false
            }
        ]);
        return { departmentId: answers.departmentId, confirmDelete: answers.confirmDelete };
    });
}
exports.promptForDeleteDepartment = promptForDeleteDepartment;
function promptForDeleteRole(roles) {
    return __awaiter(this, void 0, void 0, function* () {
        const roleChoices = roles.map(role => ({
            name: `${role.role_title} (ID: ${role.id})`,
            value: role.id
        }));
        const answers = yield inquirer_1.default.prompt([
            {
                type: 'list',
                name: 'roleId',
                message: 'Select the role to delete:',
                choices: roleChoices
            },
            {
                type: 'confirm',
                name: 'confirmDeleteRole',
                message: 'Deleting this role will also delete all associated employees. Are you sure? (y/n)',
                default: false
            }
        ]);
        return { roleId: answers.roleId, confirmDeleteRole: answers.confirmDeleteRole };
    });
}
exports.promptForDeleteRole = promptForDeleteRole;
function promptForDeleteEmployee(employees) {
    return __awaiter(this, void 0, void 0, function* () {
        const employeeChoices = employees.map(employee => ({
            name: `${employee.first_name} ${employee.last_name} (ID: ${employee.id})`,
            value: employee.id
        }));
        const answers = yield inquirer_1.default.prompt([
            {
                type: 'list',
                name: 'employeeId',
                message: 'Select the employee to delete:',
                choices: employeeChoices
            },
            {
                type: 'confirm',
                name: 'confirmDeleteEmployee',
                message: 'Are you sure you want to delete this employee? (y/n)',
                default: false
            }
        ]);
        return { employeeId: answers.employeeId, confirmDeleteEmployee: answers.confirmDeleteEmployee };
    });
}
exports.promptForDeleteEmployee = promptForDeleteEmployee;
