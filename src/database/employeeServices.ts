import { Pool } from 'pg';

export class EmployeeService {
  private pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
  }

  async getAllEmployees() {
    const query = 'SELECT * FROM employee';
    const result = await this.pool.query(query);
    return result.rows;
  }

  async getEmployeesByManager() {
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
    const result = await this.pool.query(query);
    return result.rows;
  }

  async getEmployeesByDepartment() {
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
    const result = await this.pool.query(query);
    return result.rows;
  }

  async addEmployee(firstName: string, lastName: string, roleId: number, managerId: number | null) {
    const query = 'INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ($1, $2, $3, $4)';
    await this.pool.query(query, [firstName, lastName, roleId, managerId]);
  }

  async updateEmployeeRole(employeeId: number, roleId: number) {
    const query = 'UPDATE employee SET role_id = $1 WHERE id = $2';
    await this.pool.query(query, [roleId, employeeId]);
  }

  async updateEmployeeManager(employeeId: number, managerId: number | null) {
    const query = 'UPDATE employee SET manager_id = $1 WHERE id = $2';
    await this.pool.query(query, [managerId, employeeId]);
  }

  async deleteEmployee(employeeId: number): Promise<void> {
    const client = await this.pool.connect();
    try {
      await client.query('BEGIN');
      await client.query(`
        UPDATE employee
        SET manager_id = NULL
        WHERE manager_id = $1
      `, [employeeId]);
      await client.query(`
        DELETE FROM employee
        WHERE id = $1
      `, [employeeId]);
      await client.query('COMMIT');
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release();
    }
  }
}