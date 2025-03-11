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
exports.deleteEmployee = exports.deleteRole = exports.deleteDepartment = void 0;
const deletePrompts_1 = require("../services/deletePrompts");
const chalk_1 = __importDefault(require("chalk"));
function deleteDepartment(dbService) {
    return __awaiter(this, void 0, void 0, function* () {
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
    });
}
exports.deleteDepartment = deleteDepartment;
function deleteRole(dbService) {
    return __awaiter(this, void 0, void 0, function* () {
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
    });
}
exports.deleteRole = deleteRole;
function deleteEmployee(dbService) {
    return __awaiter(this, void 0, void 0, function* () {
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
    });
}
exports.deleteEmployee = deleteEmployee;
