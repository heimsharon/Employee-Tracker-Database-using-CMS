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
exports.promptForRoleDetails = void 0;
const inquirer_1 = __importDefault(require("inquirer"));
function promptForRoleDetails(departments) {
    return __awaiter(this, void 0, void 0, function* () {
        const departmentChoices = departments.map(department => ({ name: `${department.department_name} (ID: ${department.department_id})`, value: department.department_id }));
        const answers = yield inquirer_1.default.prompt([
            {
                type: 'input',
                name: 'roleTitle',
                message: 'Enter the title of the new role:'
            },
            {
                type: 'input',
                name: 'salary',
                message: 'Enter the salary for the new role:'
            },
            {
                type: 'list',
                name: 'departmentId',
                message: 'Select the department for the new role:',
                choices: departmentChoices
            }
        ]);
        return answers;
    });
}
exports.promptForRoleDetails = promptForRoleDetails;
