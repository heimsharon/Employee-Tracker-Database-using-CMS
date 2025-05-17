// filepath: src/services/addDepartmentPrompt.ts
// This file is the prompt method to add a department.

import inquirer from 'inquirer';

// Prompts the user to enter a new department name
export async function promptForDepartmentName() {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'departmentName',
      message: 'Enter a name for the new department:',
      validate: input => input.trim() !== '' || "Department name cannot be empty." // Validate input is not empty
    }
  ]);

  return answers.departmentName; // Return the entered department name
}