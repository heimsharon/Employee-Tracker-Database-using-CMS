"use strict";
// This file contains the DepartmentService class, which provides methods to interact with the department-related data in the database.
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
exports.DepartmentService = void 0;
class DepartmentService {
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
    addDepartment(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'INSERT INTO department (department_name) VALUES ($1)';
            yield this.pool.query(query, [name]);
        });
    }
    deleteDepartment(departmentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield this.pool.connect();
            try {
                yield client.query('BEGIN');
                yield client.query(`
        UPDATE employee
        SET manager_id = NULL
        WHERE manager_id IN (
          SELECT id FROM employee WHERE role_id IN (
            SELECT id FROM role WHERE department_id = $1
          )
        )
      `, [departmentId]);
                yield client.query(`
        DELETE FROM employee
        WHERE role_id IN (
          SELECT id FROM role WHERE department_id = $1
        )
      `, [departmentId]);
                yield client.query(`
        DELETE FROM role
        WHERE department_id = $1
      `, [departmentId]);
                yield client.query(`
        DELETE FROM department
        WHERE id = $1
      `, [departmentId]);
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
}
exports.DepartmentService = DepartmentService;
