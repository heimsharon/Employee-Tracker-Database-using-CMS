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
    getEmployeesByManager() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
      SELECT 
        e.id AS "Employee ID",
        e.first_name AS "First Name",
        e.last_name AS "Last Name",
        m.first_name || ' ' || m.last_name AS "Manager"
      FROM employee e
      LEFT JOIN employee m ON e.manager_id = m.id
      ORDER BY m.id, e.id;
    `;
            const result = yield this.pool.query(query);
            return result.rows;
        });
    }
    getEmployeesByDepartment() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
      SELECT 
        e.id AS "Employee ID",
        e.first_name AS "First Name",
        e.last_name AS "Last Name",
        d.department_name AS "Department"
      FROM employee e
      JOIN role r ON e.role_id = r.id
      JOIN department d ON r.department_id = d.id
      ORDER BY d.id, e.id;
    `;
            const result = yield this.pool.query(query);
            return result.rows;
        });
    }
    getTotalUtilizedBudget(departmentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
      SELECT 
        d.department_name AS "Department",
        SUM(r.salary) AS "Total Utilized Budget"
      FROM employee e
      JOIN role r ON e.role_id = r.id
      JOIN department d ON r.department_id = d.id
      WHERE d.id = $1
      GROUP BY d.department_name;
    `;
            const result = yield this.pool.query(query, [departmentId]);
            return result.rows[0];
        });
    }
    addDepartment(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'INSERT INTO department (department_name) VALUES ($1)';
            yield this.pool.query(query, [name]);
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
            const deleteRolesQuery = 'DELETE FROM role WHERE department_id = $1';
            const deleteDepartmentQuery = 'DELETE FROM department WHERE id = $1';
            const client = yield this.pool.connect();
            try {
                yield client.query('BEGIN');
                yield client.query(deleteRolesQuery, [departmentId]);
                yield client.query(deleteDepartmentQuery, [departmentId]);
                yield client.query('COMMIT');
            }
            catch (error) {
                yield client.query('ROLLBACK');
                throw error;
            }
            finally {
                client.release();
            }
        });
    }
    deleteRole(roleId) {
        return __awaiter(this, void 0, void 0, function* () {
            const deleteEmployeesQuery = 'DELETE FROM employee WHERE role_id = $1';
            const deleteRoleQuery = 'DELETE FROM role WHERE id = $1';
            const client = yield this.pool.connect();
            try {
                yield client.query('BEGIN');
                yield client.query(deleteEmployeesQuery, [roleId]);
                yield client.query(deleteRoleQuery, [roleId]);
                yield client.query('COMMIT');
            }
            catch (error) {
                yield client.query('ROLLBACK');
                throw error;
            }
            finally {
                client.release();
            }
        });
    }
    deleteEmployee(employeeId) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'DELETE FROM employee WHERE id = $1';
            yield this.pool.query(query, [employeeId]);
        });
    }
    getRolesByDepartment(departmentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'SELECT * FROM role WHERE department_id = $1';
            const result = yield this.pool.query(query, [departmentId]);
            return result.rows;
        });
    }
    deleteEmployeesByRole(roleId) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'DELETE FROM employee WHERE role_id = $1';
            yield this.pool.query(query, [roleId]);
        });
    }
}
exports.DatabaseService = DatabaseService;
