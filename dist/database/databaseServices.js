"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseService = void 0;
const departmentServices_1 = require("./departmentServices");
const employeeServices_1 = require("./employeeServices");
const roleServices_1 = require("./roleServices");
class DatabaseService {
    constructor(pool) {
        this.departmentService = new departmentServices_1.DepartmentService(pool);
        this.employeeService = new employeeServices_1.EmployeeService(pool);
        this.roleService = new roleServices_1.RoleService(pool);
    }
}
exports.DatabaseService = DatabaseService;
