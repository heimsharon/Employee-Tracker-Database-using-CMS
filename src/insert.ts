import { Client } from 'pg';

export class InsertService {
  private client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  async addDepartment(departmentName: string): Promise<void> {
    await this.client.query(`
      INSERT INTO department (department_name)
      VALUES ($1);
    `, [departmentName]);
  }

  async addRole(roleTitle: string, salary: number, departmentId: number): Promise<void> {
    await this.client.query(`
      INSERT INTO role (role_title, salary, department_id)
      VALUES ($1, $2, $3);
    `, [roleTitle, salary, departmentId]);
  }

  async addEmployee(firstName: string, lastName: string, roleId: number, managerId: number | null): Promise<void> {
    await this.client.query(`
      INSERT INTO employee (first_name, last_name, role_id, manager_id)
      VALUES ($1, $2, $3, $4);
    `, [firstName, lastName, roleId, managerId]);
  }
};