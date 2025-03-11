// This file is the prompt method to add a role

import inquirer from 'inquirer';

export async function promptForRoleDetails(departments: any[]) {
  const departmentChoices = departments.map(department => ({ name: `${department.department_name} (ID: ${department.id})`, value: department.id }));

  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'roleTitle',
      message: 'Enter title for the new role:',
      validate: input => input.trim() !== '' || "Role title cannot be empty."
    },
    {
      type: 'input',
      name: 'salary',
      message: 'Enter the salary for the new role:',
      validate: input => !isNaN(input) && input.trim() !== '' || "Enter a valid number for the salary."
    },
    {
      type: 'list',
      name: 'departmentId',
      message: 'Select department for the new role:',
      choices: departmentChoices
    }
  ]);

  return answers;
}