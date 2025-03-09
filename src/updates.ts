import { Client } from 'pg';

export class UpdateService {
  private client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  async updateEmployeeRole(employeeId: number, roleId: number): Promise<void> {
    await this.client.query(`
      UPDATE employee
      SET role_id = $1
      WHERE id = $2;
    `, [roleId, employeeId]);
  }

  async updateEmployeeManager(employeeId: number, managerId: number): Promise<void> {
    await this.client.query(`
      UPDATE employee
      SET manager_id = $1
      WHERE id = $2;
    `, [managerId, employeeId]);
  }

  