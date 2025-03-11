"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.colorEmployeeName = exports.colorSalary = exports.colorRoleName = exports.colorDepartmentName = void 0;
const chalk_1 = __importDefault(require("chalk"));
function colorDepartmentName(departmentName) {
    return chalk_1.default.hex('#FFA500')(departmentName); // Orange color
}
exports.colorDepartmentName = colorDepartmentName;
function colorRoleName(roleName) {
    return chalk_1.default.hex('#00FF00')(roleName); // Green color
}
exports.colorRoleName = colorRoleName;
function colorSalary(salary) {
    return chalk_1.default.hex('#FFFF00')(salary.toString()); // Yellow color
}
exports.colorSalary = colorSalary;
function colorEmployeeName(employeeName) {
    return chalk_1.default.hex('#00FFFF')(employeeName); // Cyan color
}
exports.colorEmployeeName = colorEmployeeName;
