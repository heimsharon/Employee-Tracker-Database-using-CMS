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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseService = void 0;
class DatabaseService {
    constructor(pool) {
        this.pool = pool;
    }
    getAllDepartments() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'SELECT * FROM department';
            const result = yield this.pool.query(query);
            return result.rows;
        });
    }
    getAllRoles() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'SELECT * FROM role';
            const result = yield this.pool.query(query);
            return result.rows;
        });
    }
    getAllEmployees() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'SELECT * FROM employee';
            const result = yield this.pool.query(query);
            return result.rows;
        });
    }
    addDepartment(departmentName) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'INSERT INTO department (department_name) VALUES ($1)';
            yield this.pool.query(query, [departmentName]);
        });
    }
    addRole(title, salary, departmentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'INSERT INTO role (role_title, salary, department_id) VALUES ($1, $2, $3)';
            yield this.pool.query(query, [title, salary, departmentId]);
        });
    }
    addEmployee(firstName, lastName, roleId, managerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)';
            yield this.pool.query(query, [firstName, lastName, roleId, managerId]);
        });
    }
    updateEmployeeRole(employeeId, roleId) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'UPDATE employee SET role_id = $1 WHERE id = $2';
            yield this.pool.query(query, [roleId, employeeId]);
        });
    }
    updateEmployeeManager(employeeId, managerId) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'UPDATE employee SET manager_id = $1 WHERE id = $2';
            yield this.pool.query(query, [managerId, employeeId]);
        });
    }
    deleteDepartment(departmentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'DELETE FROM department WHERE id = $1';
            yield this.pool.query(query, [departmentId]);
        });
    }
    deleteRole(roleId) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'DELETE FROM role WHERE id = $1';
            yield this.pool.query(query, [roleId]);
        });
    }
    deleteEmployee(employeeId) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'DELETE FROM employee WHERE id = $1';
            yield this.pool.query(query, [employeeId]);
        });
    }
}
exports.DatabaseService = DatabaseService;
