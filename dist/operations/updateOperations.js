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
exports.updateEmployeeManager = exports.updateEmployeeRole = void 0;
const updateEmployeePrompt_1 = require("../services/updateEmployeePrompt");
const chalk_1 = __importDefault(require("chalk"));
function updateEmployeeRole(dbService) {
    return __awaiter(this, void 0, void 0, function* () {
        const allEmployeesForRoleUpdate = yield dbService.getAllEmployees();
        const allRolesForRoleUpdate = yield dbService.getAllRoles();
        const updateRoleDetails = yield (0, updateEmployeePrompt_1.promptForUpdateEmployeeRole)(allEmployeesForRoleUpdate, allRolesForRoleUpdate);
        yield dbService.updateEmployeeRole(parseInt(updateRoleDetails.employeeId), parseInt(updateRoleDetails.roleId));
        console.log(chalk_1.default.green('Updated employee role'));
    });
}
exports.updateEmployeeRole = updateEmployeeRole;
function updateEmployeeManager(dbService) {
    return __awaiter(this, void 0, void 0, function* () {
        const allEmployeesForManagerUpdate = yield dbService.getAllEmployees();
        const updateManagerDetails = yield (0, updateEmployeePrompt_1.promptForUpdateEmployeeManager)(allEmployeesForManagerUpdate);
        yield dbService.updateEmployeeManager(parseInt(updateManagerDetails.employeeId), updateManagerDetails.managerId !== null ? parseInt(updateManagerDetails.managerId) : null);
        console.log(chalk_1.default.green('Updated employee manager'));
    });
}
exports.updateEmployeeManager = updateEmployeeManager;
