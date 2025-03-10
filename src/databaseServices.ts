import { Pool } from 'pg';

export class DatabaseService {
  private pool: Pool;

  constructor(pool: Pool) {
    this.pool = pool;
  }

  async getAllDepartments() {
    const query = 'SELECT * FROM department';
    const result = await this.pool.query(query);
    return result.rows;
  }

  async getAllRoles() {
    const query = 'SELECT * FROM role';
    const result = await this.pool.query(query);
    return result.rows;
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

  async addDepartment(name: string) {
    const query = 'INSERT INTO department (department_name) VALUES ($1)';
    await this.pool.query(query, [name]);
  }

  async addRole(title: string, salary: number, departmentId: number) {
    const query = 'INSERT INTO role (role_title, salary, department_id) VALUES ($1, $2, $3)';
    await this.pool.query(query, [title, salary, departmentId]);
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

  async deleteDepartment(departmentId: number): Promise<void> {
    const client = await this.pool.connect();
    try {
      await client.query('BEGIN');

      // Set manager_id to NULL for employees managed by employees in the department
      await client.query(`
        UPDATE employee
        SET manager_id = NULL
        WHERE manager_id IN (
          SELECT id FROM employee WHERE role_id IN (
            SELECT id FROM role WHERE department_id = $1
          )
        )
      `, [departmentId]);

      // Delete employees associated with roles in the department
      await client.query(`
        DELETE FROM employee
        WHERE role_id IN (
          SELECT id FROM role WHERE department_id = $1
        )
      `, [departmentId]);

      // Delete roles associated with the department
      await client.query(`
        DELETE FROM role
        WHERE department_id = $1
      `, [departmentId]);

      // Delete the department
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

  async deleteRole(roleId: number): Promise<void> {
    const client = await this.pool.connect();
    try {
      await client.query('BEGIN');

      // Set manager_id to NULL for employees managed by employees with the role
      await client.query(`
        UPDATE employee
        SET manager_id = NULL
        WHERE manager_id IN (
          SELECT id FROM employee WHERE role_id = $1
        )
      `, [roleId]);

      // Delete employees associated with the role
      await client.query(`
        DELETE FROM employee
        WHERE role_id = $1
      `, [roleId]);

      // Delete the role
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

  async deleteEmployee(employeeId: number): Promise<void> {
    const client = await this.pool.connect();
    try {
      await client.query('BEGIN');

      // Set manager_id to NULL for employees managed by the employee
      await client.query(`
        UPDATE employee
        SET manager_id = NULL
        WHERE manager_id = $1
      `, [employeeId]);

      // Delete the employee
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

  async getRolesByDepartment(departmentId: number) {
    const query = 'SELECT * FROM role WHERE department_id = $1';
    const result = await this.pool.query(query, [departmentId]);
    return result.rows;
  }

  async deleteEmployeesByRole(roleId: number) {
    const query = 'DELETE FROM employee WHERE role_id = $1';
    await this.pool.query(query, [roleId]);
  }
}