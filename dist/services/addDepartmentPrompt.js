"use strict";
// This file is the prompt method to add a department.
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
exports.promptForDepartmentName = void 0;
const inquirer_1 = __importDefault(require("inquirer"));
function promptForDepartmentName() {
    return __awaiter(this, void 0, void 0, function* () {
        const answers = yield inquirer_1.default.prompt([
            {
                type: 'input',
                name: 'departmentName',
                message: 'Enter a name for the new department:',
                validate: input => input.trim() !== '' || "Department name cannot be empty."
            }
        ]);
        return answers.departmentName;
    });
}
exports.promptForDepartmentName = promptForDepartmentName;
