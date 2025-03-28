"use strict";
// This file contains functions to view various data from the database. 
// It includes methods to view all departments, all employees, employees by department, employees by manager, and all roles.
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
exports.viewAllRoles = exports.viewEmployeesByManager = exports.viewEmployeesByDepartment = exports.viewAllEmployees = exports.viewAllDepartments = void 0;
const displayTable_1 = require("../services/utils/displayTable");
const colorUtils_1 = require("../services/utils/colorUtils");
const chalk_1 = __importDefault(require("chalk"));
function viewAllDepartments(departmentService) {
    return __awaiter(this, void 0, void 0, function* () {
        const departments = yield departmentService.getAllDepartments();
        console.log(chalk_1.default.blue('All Departments:'));
        (0, displayTable_1.displayTableWithoutIndex)(departments.map(department => ({
            'Department ID': department.id,
            'Department Name': (0, colorUtils_1.colorDepartmentName)(department.department_name)
        })));
    });
}
exports.viewAllDepartments = viewAllDepartments;
function viewAllEmployees(employeeService, roleService, departmentService) {
    return __awaiter(this, void 0, void 0, function* () {
        const employees = yield employeeService.getAllEmployees();
        const rolesForEmployees = yield roleService.getAllRoles();
        const departmentsForEmployees = yield departmentService.getAllDepartments();
        const employeesWithDetails = employees.map(employee => {
            const role = rolesForEmployees.find((role) => role.id === employee.role_id);
            const department = role ? departmentsForEmployees.find((dept) => dept.id === role.department_id) : null;
            const manager = employees.find(emp => emp.id === employee.manager_id);
            return {
                'Employee ID': employee.id,
                'First Name': (0, colorUtils_1.colorEmployeeName)(employee.first_name),
                'Last Name': (0, colorUtils_1.colorEmployeeName)(employee.last_name),
                'Job Title': role ? (0, colorUtils_1.colorRoleName)(role.role_title) : 'Unknown',
                'Department': department ? (0, colorUtils_1.colorDepartmentName)(department.department_name) : 'Unknown',
                'Salary': role ? (0, colorUtils_1.colorSalary)(role.salary) : 'Unknown',
                'Manager': manager ? (0, colorUtils_1.colorEmployeeName)(`${manager.first_name} ${manager.last_name}`) : 'None'
            };
        });
        console.log(chalk_1.default.blue('All Employees:'));
        (0, displayTable_1.displayTableWithoutIndex)(employeesWithDetails);
    });
}
exports.viewAllEmployees = viewAllEmployees;
function viewEmployeesByDepartment(employeeService) {
    return __awaiter(this, void 0, void 0, function* () {
        const employeesByDepartment = yield employeeService.getEmployeesByDepartment();
        console.log(chalk_1.default.blue('Employees by Department:'));
        (0, displayTable_1.displayTableWithoutIndex)(employeesByDepartment.map(employee => ({
            'Employee ID': employee.id,
            'First Name': (0, colorUtils_1.colorEmployeeName)(employee.first_name),
            'Last Name': (0, colorUtils_1.colorEmployeeName)(employee.last_name),
            'Department': (0, colorUtils_1.colorDepartmentName)(employee.department_name)
        })));
    });
}
exports.viewEmployeesByDepartment = viewEmployeesByDepartment;
function viewEmployeesByManager(employeeService) {
    return __awaiter(this, void 0, void 0, function* () {
        const employeesByManager = yield employeeService.getEmployeesByManager();
        console.log(chalk_1.default.blue('Employees by Manager:'));
        (0, displayTable_1.displayTableWithoutIndex)(employeesByManager.map(employee => ({
            'Employee ID': employee.id,
            'First Name': (0, colorUtils_1.colorEmployeeName)(employee.first_name),
            'Last Name': (0, colorUtils_1.colorEmployeeName)(employee.last_name),
            'Manager': (0, colorUtils_1.colorEmployeeName)(employee.manager)
        })));
    });
}
exports.viewEmployeesByManager = viewEmployeesByManager;
function viewAllRoles(roleService, departmentService) {
    return __awaiter(this, void 0, void 0, function* () {
        const roles = yield roleService.getAllRoles();
        const departmentsForRoles = yield departmentService.getAllDepartments();
        const rolesWithDepartments = roles.map(role => {
            const department = departmentsForRoles.find((dept) => dept.id === role.department_id);
            return {
                'Role ID': role.id,
                'Job Title': (0, colorUtils_1.colorRoleName)(role.role_title),
                'Department': department ? (0, colorUtils_1.colorDepartmentName)(department.department_name) : 'Unknown',
                'Salary': (0, colorUtils_1.colorSalary)(role.salary)
            };
        });
        console.log(chalk_1.default.blue('All Roles:'));
        (0, displayTable_1.displayTableWithoutIndex)(rolesWithDepartments);
    });
}
exports.viewAllRoles = viewAllRoles;
