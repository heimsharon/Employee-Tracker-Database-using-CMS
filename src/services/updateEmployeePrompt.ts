// filepath: src/services/updateEmployeePrompt.ts
// This file is the prompt method to update the employee role and manager

import inquirer from 'inquirer';

// Prompts the user to select an employee and a new role for that employee
export async function promptForUpdateEmployeeRole(employees: any[], roles: any[]) {
  const employeeChoices = employees.map(employee => ({ name: `${employee.first_name} ${employee.last_name} (ID: ${employee.id})`, value: employee.id })); // Prepare employee choices
  const roleChoices = roles.map(role => ({ name: `${role.role_title} (ID: ${role.id})`, value: role.id })); // Prepare role choices

  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'employeeId',
      message: 'Select an employee to update:',
      choices: employeeChoices // List of employees to choose from
    },
    {
      type: 'list',
      name: 'roleId',
      message: 'Select the new role for the employee:',
      choices: roleChoices // List of roles to choose from
    }
  ]);

  return answers; // Return selected employee and new role
}

// Prompts the user to select an employee and a new manager for that employee
export async function promptForUpdateEmployeeManager(employees: any[]) {
  const employeeChoices = employees.map(employee => ({ name: `${employee.first_name} ${employee.last_name} (ID: ${employee.id})`, value: employee.id })); // Prepare employee choices
  const managerChoices = [{ name: 'None', value: null }, ...employeeChoices]; // Add 'None' option for no manager

  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'employeeId',
      message: 'Select an employee to update:',
      choices: employeeChoices // List of employees to choose from
    },
    {
      type: 'list',
      name: 'managerId',
      message: 'Select a new manager for the employee:',
      choices: managerChoices // List of managers to choose from
    }
  ]);

  return answers; // Return selected employee and new manager
}