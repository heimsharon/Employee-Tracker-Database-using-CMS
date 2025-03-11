"use strict";
// This file contains functions to update existing employee data in the database, including their manager. 
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
exports.updateEmployeeManager = exports.updateEmployeeRole = void 0;
const updateEmployeePrompt_1 = require("../services/updateEmployeePrompt");
const chalk_1 = __importDefault(require("chalk"));
function updateEmployeeRole(employeeService, roleService) {
    return __awaiter(this, void 0, void 0, function* () {
        const allEmployeesForRoleUpdate = yield employeeService.getAllEmployees();
        const allRolesForRoleUpdate = yield roleService.getAllRoles();
        const updateRoleDetails = yield (0, updateEmployeePrompt_1.promptForUpdateEmployeeRole)(allEmployeesForRoleUpdate, allRolesForRoleUpdate);
        yield employeeService.updateEmployeeRole(parseInt(updateRoleDetails.employeeId), parseInt(updateRoleDetails.roleId));
        console.log(chalk_1.default.green('Updated employee role'));
    });
}
exports.updateEmployeeRole = updateEmployeeRole;
function updateEmployeeManager(employeeService) {
    return __awaiter(this, void 0, void 0, function* () {
        const allEmployeesForManagerUpdate = yield employeeService.getAllEmployees();
        const updateManagerDetails = yield (0, updateEmployeePrompt_1.promptForUpdateEmployeeManager)(allEmployeesForManagerUpdate);
        yield employeeService.updateEmployeeManager(parseInt(updateManagerDetails.employeeId), updateManagerDetails.managerId !== null ? parseInt(updateManagerDetails.managerId) : null);
        console.log(chalk_1.default.green('Updated employee manager'));
    });
}
exports.updateEmployeeManager = updateEmployeeManager;
