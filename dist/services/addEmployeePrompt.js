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
exports.promptForEmployeeDetails = void 0;
const inquirer_1 = __importDefault(require("inquirer"));
function promptForEmployeeDetails(roles, employees) {
    return __awaiter(this, void 0, void 0, function* () {
        const roleChoices = roles.map(role => ({ name: `${role.role_title} (ID: ${role.id})`, value: role.id }));
        const employeeChoices = employees.map(employee => ({ name: `${employee.first_name} ${employee.last_name} (ID: ${employee.id})`, value: employee.id }));
        const answers = yield inquirer_1.default.prompt([
            {
                type: 'input',
                name: 'firstName',
                message: 'Enter the first name of the new employee:',
                validate: input => input.trim() !== '' || "First name cannot be empty."
            },
            {
                type: 'input',
                name: 'lastName',
                message: 'Enter the last name of the new employee:',
                validate: input => input.trim() !== '' || "Last name cannot be empty."
            },
            {
                type: 'list',
                name: 'roleId',
                message: 'Select a role for the new employee:',
                choices: roleChoices
            },
            {
                type: 'list',
                name: 'managerId',
                message: 'Select a manager for the new employee (or leave blank if none):',
                choices: [{ name: 'None', value: null }, ...employeeChoices]
            }
        ]);
        return {
            firstName: answers.firstName,
            lastName: answers.lastName,
            roleId: answers.roleId,
            managerId: answers.managerId !== null ? parseInt(answers.managerId) : null
        };
    });
}
exports.promptForEmployeeDetails = promptForEmployeeDetails;
