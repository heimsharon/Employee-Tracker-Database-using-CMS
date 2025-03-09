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

  async addDepartment(name: string) {
    const query = 'INSERT INTO department (name) VALUES ($1)';
    await this.pool.query(query, [name]);
  }

  async addRole(title: string, salary: number, departmentId: number) {
    const query = 'INSERT INTO role (title, salary, department_id) VALUES ($1, $2, $3)';
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

  async deleteDepartment(departmentId: number) {
    const query = 'DELETE FROM department WHERE id = $1';
    await this.pool.query(query, [departmentId]);
  }

  async deleteRole(roleId: number) {
    const query = 'DELETE FROM role WHERE id = $1';
    await this.pool.query(query, [roleId]);
  }

  async deleteEmployee(employeeId: number) {
    const query = 'DELETE FROM employee WHERE id = $1';
    await this.pool.query(query, [employeeId]);
  }
}