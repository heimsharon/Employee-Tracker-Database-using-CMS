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
exports.EmployeeService = void 0;
class EmployeeService {
    constructor(pool) {
        this.pool = pool;
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
    deleteEmployee(employeeId) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield this.pool.connect();
            try {
                yield client.query('BEGIN');
                yield client.query(`
        UPDATE employee
        SET manager_id = NULL
        WHERE manager_id = $1
      `, [employeeId]);
                yield client.query(`
        DELETE FROM employee
        WHERE id = $1
      `, [employeeId]);
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
}
exports.EmployeeService = EmployeeService;
