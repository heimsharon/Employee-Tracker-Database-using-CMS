"use strict";
// This file is the prompt method to add a role
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
exports.promptForRoleDetails = void 0;
const inquirer_1 = __importDefault(require("inquirer"));
function promptForRoleDetails(departments) {
    return __awaiter(this, void 0, void 0, function* () {
        const departmentChoices = departments.map(department => ({ name: `${department.department_name} (ID: ${department.id})`, value: department.id }));
        const answers = yield inquirer_1.default.prompt([
            {
                type: 'input',
                name: 'roleTitle',
                message: 'Enter title for the new role:',
                validate: input => input.trim() !== '' || "Role title cannot be empty."
            },
            {
                type: 'input',
                name: 'salary',
                message: 'Enter the salary for the new role:',
                validate: input => !isNaN(input) && input.trim() !== '' || "Enter a valid number for the salary."
            },
            {
                type: 'list',
                name: 'departmentId',
                message: 'Select department for the new role:',
                choices: departmentChoices
            }
        ]);
        return answers;
    });
}
exports.promptForRoleDetails = promptForRoleDetails;
