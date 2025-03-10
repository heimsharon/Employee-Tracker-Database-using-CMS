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
exports.promptForUpdateEmployeeManager = exports.promptForUpdateEmployeeRole = void 0;
const inquirer_1 = __importDefault(require("inquirer"));
function promptForUpdateEmployeeRole(employees, roles) {
    return __awaiter(this, void 0, void 0, function* () {
        const employeeChoices = employees.map(employee => ({ name: `${employee.first_name} ${employee.last_name} (ID: ${employee.id})`, value: employee.id }));
        const roleChoices = roles.map(role => ({ name: `${role.role_title} (ID: ${role.id})`, value: role.id }));
        const answers = yield inquirer_1.default.prompt([
            {
                type: 'list',
                name: 'employeeId',
                message: 'Select the employee to update:',
                choices: employeeChoices
            },
            {
                type: 'list',
                name: 'roleId',
                message: 'Select the new role for the employee:',
                choices: roleChoices
            }
        ]);
        return answers;
    });
}
exports.promptForUpdateEmployeeRole = promptForUpdateEmployeeRole;
function promptForUpdateEmployeeManager(employees) {
    return __awaiter(this, void 0, void 0, function* () {
        const employeeChoices = employees.map(employee => ({ name: `${employee.first_name} ${employee.last_name} (ID: ${employee.id})`, value: employee.id }));
        const managerChoices = [{ name: 'None', value: null }, ...employeeChoices];
        const answers = yield inquirer_1.default.prompt([
            {
                type: 'list',
                name: 'employeeId',
                message: 'Select the employee to update:',
                choices: employeeChoices
            },
            {
                type: 'list',
                name: 'managerId',
                message: 'Select the new manager for the employee:',
                choices: managerChoices
            }
        ]);
        return answers;
    });
}
exports.promptForUpdateEmployeeManager = promptForUpdateEmployeeManager;
