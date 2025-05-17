// filepath: src/services/addRolePrompt.ts
// This file is the prompt method to add a role

import inquirer from 'inquirer';

// Prompts the user to enter details for a new role
export async function promptForRoleDetails(departments: any[]) {
  // Prepare choices for department selection
  const departmentChoices = departments.map(department => ({ name: `${department.department_name} (ID: ${department.id})`, value: department.id }));

  // Prompt user for role details
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'roleTitle',
      message: 'Enter title for the new role:',
      validate: input => input.trim() !== '' || "Role title cannot be empty." // Validate input is not empty
    },
    {
      type: 'input',
      name: 'salary',
      message: 'Enter the salary for the new role:',
      validate: input => !isNaN(input) && input.trim() !== '' || "Enter a valid number for the salary." // Validate salary is a number and not empty
    },
    {
      type: 'list',
      name: 'departmentId',
      message: 'Select department for the new role:',
      choices: departmentChoices // List of available departments
    }
  ]);

  // Return the collected role details
  return answers;
}