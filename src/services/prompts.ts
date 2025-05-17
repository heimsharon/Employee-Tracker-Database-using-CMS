// filepath: src/services/prompts.ts
// This file sets up the prompt menu.

import inquirer from 'inquirer';

// Displays the main menu and returns the user's selected action
export async function mainMenu() {
  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'What would you like to do?',
      choices: [
        'View All Departments',                // Option to view all departments
        'View All Employees',                  // Option to view all employees
        'View All Roles',                      // Option to view all roles
        'Add Department',                      // Option to add a new department
        'Add Role',                            // Option to add a new role
        'Add Employee',                        // Option to add a new employee
        'Update Employee Role',                // Option to update an employee's role
        'Update Employee Manager',             // Option to update an employee's manager
        'Delete Department',                   // Option to delete a department
        'Delete Role',                         // Option to delete a role
        'Delete Employee',                     // Option to delete an employee
        'View Total Utilized Budget of a Department', // Option to view department budget
        'Exit'                                // Option to exit the application
      ]
    }
  ]);

  return answers.action; // Return the selected action
}