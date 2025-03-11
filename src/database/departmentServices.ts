// This file contains the DepartmentService class, which provides methods to interact with the department-related data in the database.

import { Pool } from 'pg';

export class DepartmentService {
    private pool: Pool;

    constructor(pool: Pool) {
        this.pool = pool;
    }

    async getAllDepartments() {
        const query = 'SELECT * FROM department';
        const result = await this.pool.query(query);
        return result.rows;
    }

    async addDepartment(name: string) {
        const query = 'INSERT INTO department (department_name) VALUES ($1)';
        await this.pool.query(query, [name]);
    }

    async deleteDepartment(departmentId: number): Promise<void> {
        const client = await this.pool.connect();
        try {
            await client.query('BEGIN');
            await client.query(`
        UPDATE employee
        SET manager_id = NULL
        WHERE manager_id IN (
          SELECT id FROM employee WHERE role_id IN (
            SELECT id FROM role WHERE department_id = $1
          )
        )
      `, [departmentId]);
            await client.query(`
        DELETE FROM employee
        WHERE role_id IN (
          SELECT id FROM role WHERE department_id = $1
        )
      `, [departmentId]);
            await client.query(`
        DELETE FROM role
        WHERE department_id = $1
      `, [departmentId]);
            await client.query(`
        DELETE FROM department
        WHERE id = $1
      `, [departmentId]);
            await client.query('COMMIT');
        } catch (error) {
            await client.query('ROLLBACK');
            throw error;
        } finally {
            client.release();
        }
    }

    async getTotalUtilizedBudget(departmentId: number) {
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
        const result = await this.pool.query(query, [departmentId]);
        return result.rows[0];
    }
}