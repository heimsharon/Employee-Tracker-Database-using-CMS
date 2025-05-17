// filepath: src/services/deletePrompts.ts
// This file is the prompt method to delete a department, role or employee, with warning messages.

import inquirer from 'inquirer';
import { DatabaseService } from '../database/databaseServices';
import { Pool } from 'pg';

// NOTE: For security, never hard-code your database credentials in source files if the code will be posted publicly.
// Use a .env file and a library like dotenv to load sensitive information from environment variables.

// Initialize the PostgreSQL connection pool
const pool = new Pool({
  user: 'username', // Replace with your actual username
  host: 'localhost',
  database: 'employees_db',
  password: 'ThisIsMyPassword', // Replace with your actual password
  port: 5432,
});

// Create a new instance of the database service
const dbService = new DatabaseService(pool);

// Prompt user to select a department to delete and confirm deletion
export async function promptForDeleteDepartment(departments: any[]): Promise<{ departmentId: string, confirmDelete: boolean }> {
  const departmentChoices = departments.map(department => ({
    name: `${department.department_name} (ID: ${department.id})`,
    value: department.id
  }));

  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'departmentId',
      message: 'Select the department to delete:',
      choices: departmentChoices
    },
    {
      type: 'confirm',
      name: 'confirmDelete',
      message: 'Deleting this department will also delete all roles associated with it. Are you sure? (y/n)',
      default: false
    }
  ]);

  return { departmentId: answers.departmentId, confirmDelete: answers.confirmDelete };
}

// Prompt user to select a role to delete and confirm deletion
export async function promptForDeleteRole(roles: any[]): Promise<{ roleId: string, confirmDeleteRole: boolean }> {
  const roleChoices = roles.map(role => ({
    name: `${role.role_title} (ID: ${role.id})`,
    value: role.id
  }));

  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'roleId',
      message: 'Select the role to delete:',
      choices: roleChoices
    },
    {
      type: 'confirm',
      name: 'confirmDeleteRole',
      message: 'Deleting this role will also delete all associated employees. Are you sure? (y/n)',
      default: false
    }
  ]);

  return { roleId: answers.roleId, confirmDeleteRole: answers.confirmDeleteRole };
}

// Prompt user to select an employee to delete and confirm deletion
export async function promptForDeleteEmployee(employees: any[]): Promise<{ employeeId: string, confirmDeleteEmployee: boolean }> {
  const employeeChoices = employees.map(employee => ({
    name: `${employee.first_name} ${employee.last_name} (ID: ${employee.id})`,
    value: employee.id
  }));

  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'employeeId',
      message: 'Select the employee to delete:',
      choices: employeeChoices
    },
    {
      type: 'confirm',
      name: 'confirmDeleteEmployee',
      message: 'Are you sure you want to delete this employee? (y/n)',
      default: false
    }
  ]);

  return { employeeId: answers.employeeId, confirmDeleteEmployee: answers.confirmDeleteEmployee };
}