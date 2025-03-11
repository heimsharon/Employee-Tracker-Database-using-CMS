"use strict";
// This file contains functions to add new departments, roles, and employees to the database. 
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
exports.addEmployee = exports.addRole = exports.addDepartment = void 0;
const addDepartmentPrompt_1 = require("../services/addDepartmentPrompt");
const addRolePrompt_1 = require("../services/addRolePrompt");
const addEmployeePrompt_1 = require("../services/addEmployeePrompt");
const chalk_1 = __importDefault(require("chalk"));
function addDepartment(departmentService) {
    return __awaiter(this, void 0, void 0, function* () {
        const departmentName = yield (0, addDepartmentPrompt_1.promptForDepartmentName)();
        const existingDepartments = yield departmentService.getAllDepartments();
        yield departmentService.addDepartment(departmentName);
        console.log(chalk_1.default.green('Added new department'));
    });
}
exports.addDepartment = addDepartment;
function addRole(roleService, departmentService) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingDepartments = yield departmentService.getAllDepartments();
        const existingRoles = yield roleService.getAllRoles();
        const roleDetails = yield (0, addRolePrompt_1.promptForRoleDetails)(existingDepartments);
        yield roleService.addRole(roleDetails.roleTitle, parseFloat(roleDetails.salary), parseInt(roleDetails.departmentId));
        console.log(chalk_1.default.green('Added new role'));
    });
}
exports.addRole = addRole;
function addEmployee(employeeService, roleService) {
    return __awaiter(this, void 0, void 0, function* () {
        const existingRoles = yield roleService.getAllRoles();
        const existingEmployees = yield employeeService.getAllEmployees();
        const employeeDetails = yield (0, addEmployeePrompt_1.promptForEmployeeDetails)(existingRoles, existingEmployees);
        yield employeeService.addEmployee(employeeDetails.firstName, employeeDetails.lastName, parseInt(employeeDetails.roleId), employeeDetails.managerId);
        console.log(chalk_1.default.green('Added new employee'));
    });
}
exports.addEmployee = addEmployee;
