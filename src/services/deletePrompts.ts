import inquirer from 'inquirer';
import { DatabaseService } from '../databaseServices';
import { Pool } from 'pg';

const pool = new Pool({
  user: 'heimsharon',
  host: 'localhost',
  database: 'employees_db',
  password: 'Thisisstupid11',
  port: 5432,
});

const dbService = new DatabaseService(pool);

export async function promptForDeleteDepartment(departments: any[]) {
  const departmentChoices = departments.map(department => ({ name: `${department.department_name} (ID: ${department.id})`, value: department.id }));

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
      message: 'Deleting this department will also delete all associated roles. Are you sure?',
      default: false
    }
  ]);

  if (answers.confirmDelete) {
    const departmentId = answers.departmentId;

    try {
      // Get all roles associated with the department
      const roles = await dbService.getRolesByDepartment(departmentId);

      // Delete all employees associated with each role
      for (const role of roles) {
        await dbService.deleteEmployeesByRole(role.id);
      }

      // Delete all roles associated with the department
      for (const role of roles) {
        await dbService.deleteRole(role.id);
      }

      // Delete the department
      await dbService.deleteDepartment(departmentId);
      console.log(`Department with ID ${departmentId} has been deleted.`);
    } catch (error) {
      if (error instanceof Error) {
        console.error(`Failed to delete department with ID ${departmentId}:`, error.message);
      } else {
        console.error(`Failed to delete department with ID ${departmentId}:`, error);
      }
    }

    return departmentId;
  } else {
    console.log('Deletion cancelled.');
    return null;
  }
}

export async function promptForDeleteRole(roles: any[]) {
  const roleChoices = roles.map(role => ({ name: `${role.role_title} (ID: ${role.id})`, value: role.id }));

  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'roleId',
      message: 'Select the role to delete:',
      choices: roleChoices
    },
    {
      type: 'confirm',
      name: 'confirmDelete',
      message: 'Deleting this role will also delete all associated employees. Are you sure?',
      default: false
    }
  ]);

  if (answers.confirmDelete) {
    const roleId = answers.roleId;

    try {
      await dbService.deleteRole(roleId);
      console.log(`Role with ID ${roleId} has been deleted.`);
    } catch (error) {
      if (error instanceof Error) {
        console.error(`Failed to delete role with ID ${roleId}:`, error.message);
      } else {
        console.error(`Failed to delete role with ID ${roleId}:`, error);
      }
    }

    return roleId;
  } else {
    console.log('Deletion cancelled.');
    return null;
  }
}

export async function promptForDeleteEmployee(employees: any[]) {
  const employeeChoices = employees.map(employee => ({ name: `${employee.first_name} ${employee.last_name} (ID: ${employee.id})`, value: employee.id }));

  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'employeeId',
      message: 'Select the employee to delete:',
      choices: employeeChoices
    },
    {
      type: 'confirm',
      name: 'confirmDelete',
      message: 'Are you sure you want to delete this employee?',
      default: false
    }
  ]);

  if (answers.confirmDelete) {
    const employeeId = answers.employeeId;

    try {
      await dbService.deleteEmployee(employeeId);
      console.log(`Employee with ID ${employeeId} has been deleted.`);
    } catch (error) {
      if (error instanceof Error) {
        console.error(`Failed to delete employee with ID ${employeeId}:`, error.message);
      } else {
        console.error(`Failed to delete employee with ID ${employeeId}:`, error);
      }
    }

    return employeeId;
  } else {
    console.log('Deletion cancelled.');
    return null;
  }
}