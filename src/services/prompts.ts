// This file sets up the prompt menu.

import inquirer from 'inquirer';

export async function mainMenu() {
  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        'View All Departments',
        'View All Employees',
        'View All Roles',
        'Add Department',
        'Add Role',
        'Add Employee',
        'Update Employee Role',
        'Update Employee Manager',
        'Delete Department',
        'Delete Role',
        'Delete Employee',
        'View Total Utilized Budget of a Department',
        'Exit'
      ]
    }
  ]);

  return answers.action;
}