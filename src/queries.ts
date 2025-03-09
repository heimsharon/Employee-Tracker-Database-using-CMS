import { Client } from 'pg';

export class QueryService {
  private client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  async getAllDepartments(): Promise<any[]> {
    const result = await this.client.query(`
      SELECT department.department_name, department.id AS department_id
      FROM department;
    `);
    return result.rows;
  }

  async getAllEmployees(): Promise<any[]> {
    const result = await this.client.query(`
      SELECT employee.id, employee.first_name, employee.last_name, role.role_title, role.department_id, role.salary, employee.manager_id
      FROM employee
      LEFT JOIN role ON employee.role_id = role.id;
    `);
    return result.rows;
  }

  async getAllRoles(): Promise<any[]> {
    const result = await this.client.query(`
      SELECT role.role_title, role.id AS role_id, department.department_name, role.salary
      FROM role
      LEFT JOIN department ON role.department_id = department.id;
    `);
    return result.rows;
  }

}