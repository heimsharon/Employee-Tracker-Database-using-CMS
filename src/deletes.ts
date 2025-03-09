import { Client } from 'pg';

export class DeleteService {
  private client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  async deleteDepartment(departmentId: number): Promise<void> {
    await this.client.query(`
      DELETE FROM department
      WHERE id = $1;
    `, [departmentId]);
  }

  async deleteRole(roleId: number): Promise<void> {
    await this.client.query(`
      DELETE FROM role
      WHERE id = $1;
    `, [roleId]);
  }

  async deleteEmployee(employeeId: number): Promise<void> {
    await this.client.query(`
      DELETE FROM employee
      WHERE id = $1;
    `, [employeeId]);
  }

 
}