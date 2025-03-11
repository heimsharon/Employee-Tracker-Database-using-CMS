"use strict";
// This file contains the RoleService class, which provides methods to interact with the role-related data in the database. 
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
exports.RoleService = void 0;
class RoleService {
    constructor(pool) {
        this.pool = pool;
    }
    getAllRoles() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'SELECT * FROM role';
            const result = yield this.pool.query(query);
            return result.rows;
        });
    }
    addRole(title, salary, departmentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'INSERT INTO role (role_title, salary, department_id) VALUES ($1, $2, $3)';
            yield this.pool.query(query, [title, salary, departmentId]);
        });
    }
    deleteRole(roleId) {
        return __awaiter(this, void 0, void 0, function* () {
            const client = yield this.pool.connect();
            try {
                yield client.query('BEGIN');
                yield client.query(`
        UPDATE employee
        SET manager_id = NULL
        WHERE manager_id IN (
          SELECT id FROM employee WHERE role_id = $1
        )
      `, [roleId]);
                yield client.query(`
        DELETE FROM employee
        WHERE role_id = $1
      `, [roleId]);
                yield client.query(`
        DELETE FROM role
        WHERE id = $1
      `, [roleId]);
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
    getRolesByDepartment(departmentId) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = 'SELECT * FROM role WHERE department_id = $1';
            const result = yield this.pool.query(query, [departmentId]);
            return result.rows;
        });
    }
}
exports.RoleService = RoleService;
