// filepath: src/services/addEmployeePrompt.ts
// This file is the prompt methods to add an employee

import inquirer from 'inquirer';

// Prompts the user to enter details for a new employee
export async function promptForEmployeeDetails(roles: any[], employees: any[]) {
  // Prepare choices for roles and managers
  const roleChoices = roles.map(role => ({ name: `${role.role_title} (ID: ${role.id})`, value: role.id }));
  const employeeChoices = employees.map(employee => ({ name: `${employee.first_name} ${employee.last_name} (ID: ${employee.id})`, value: employee.id }));

  // Prompt user for employee details
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'firstName',
      message: 'Enter the first name of the new employee:',
      validate: input => input.trim() !== '' || "First name cannot be empty." // Validate input is not empty
    },
    {
      type: 'input',
      name: 'lastName',
      message: 'Enter the last name of the new employee:',
      validate: input => input.trim() !== '' || "Last name cannot be empty." // Validate input is not empty
    },
    {
      type: 'list',
      name: 'roleId',
      message: 'Select a role for the new employee:',
      choices: roleChoices // List of available roles
    },
    {
      type: 'list',
      name: 'managerId',
      message: 'Select a manager for the new employee (or leave blank if none):',
      choices: [{ name: 'None', value: null }, ...employeeChoices] // List of available managers, with 'None' option
    }
  ]);

  // Return the collected employee details
  return {
    firstName: answers.firstName,
    lastName: answers.lastName,
    roleId: answers.roleId,
    managerId: answers.managerId !== null ? parseInt(answers.managerId) : null
  };
}