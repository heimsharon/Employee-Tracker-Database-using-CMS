// This file contains the RoleService class, which provides methods to interact with the role-related data in the database. 

import { Pool } from 'pg';

export interface Role {
    id: number;
    role_title: string;
    salary: number;
    department_id: number;
}

export interface Department {
    id: number;
    department_name: string;
}

export class RoleService {
    private pool: Pool;

    constructor(pool: Pool) {
        this.pool = pool;
    }

    async getAllRoles() {
        const query = 'SELECT * FROM role';
        const result = await this.pool.query(query);
        return result.rows;
    }

    async addRole(title: string, salary: number, departmentId: number) {
        const query = 'INSERT INTO role (role_title, salary, department_id) VALUES ($1, $2, $3)';
        await this.pool.query(query, [title, salary, departmentId]);
    }

    async deleteRole(roleId: number): Promise<void> {
        const client = await this.pool.connect();
        try {
            await client.query('BEGIN');
            await client.query(`
        UPDATE employee
        SET manager_id = NULL
        WHERE manager_id IN (
          SELECT id FROM employee WHERE role_id = $1
        )
      `, [roleId]);
            await client.query(`
        DELETE FROM employee
        WHERE role_id = $1
      `, [roleId]);
            await client.query(`
        DELETE FROM role
        WHERE id = $1
      `, [roleId]);
            await client.query('COMMIT');
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    }

    async getRolesByDepartment(departmentId: number) {
        const query = 'SELECT * FROM role WHERE department_id = $1';
        const result = await this.pool.query(query, [departmentId]);
        return result.rows;
    }
}