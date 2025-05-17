// filepath: src/index.ts
// This file is the main entry point for the Employee Tracker application.
// This is the file the application runs from, as it compiles all the supporting files.

import { Pool } from 'pg';
import { config } from 'dotenv';
import { DatabaseService } from './database/databaseServices';
import { mainMenu } from './services/prompts';
import { displayAsciiArt } from './services/utils/asciiArt';
import { addDepartment, addRole, addEmployee } from './operations/addOperations';
import { updateEmployeeRole, updateEmployeeManager } from './operations/updateOperations';
import { deleteDepartment, deleteRole, deleteEmployee } from './operations/deleteOperations';
import { viewAllDepartments, viewAllEmployees, viewEmployeesByDepartment, viewEmployeesByManager, viewAllRoles } from './operations/viewOperations';
import inquirer from 'inquirer';
import chalk from 'chalk';

config(); // Load environment variables from .env file

// Set up database configuration using environment variables
const dbConfig = {
  user: process.env.DB_USER as string,
  host: process.env.DB_HOST as string,
  database: process.env.DB_DATABASE as string,
  password: process.env.DB_PASSWORD as string,
  port: parseInt(process.env.DB_PORT || '5432', 10),
};

async function main() {
  const pool = new Pool(dbConfig); // Create a new PostgreSQL connection pool
  const dbService = new DatabaseService(pool); // Initialize the database service

  try {
    await pool.connect(); // Connect to the database

    // Display the ASCII art when the app starts
    displayAsciiArt();

    // Main application loop
    let exit = false;
    while (!exit) {
      const action = await mainMenu(); // Show main menu and get user action

      switch (action) {
        case 'View All Departments':
          await viewAllDepartments(dbService.departmentService);
          break;
        case 'View All Employees':
          await viewAllEmployees(dbService.employeeService, dbService.roleService, dbService.departmentService);
          break;
        case 'View Employees by Department':
          await viewEmployeesByDepartment(dbService.employeeService);
          break;
        case 'View Employees by Manager':
          await viewEmployeesByManager(dbService.employeeService);
          break;
        case 'View All Roles':
          await viewAllRoles(dbService.roleService, dbService.departmentService);
          break;
        case 'View Total Utilized Budget of a Department':
          // Prompt user to select a department for budget view
          const allDepartmentsForBudget = await dbService.departmentService.getAllDepartments();
          const departmentChoices = allDepartmentsForBudget.map(department => ({
            name: `${department.department_name} (ID: ${department.id})`,
            value: department.id
          }));
          const budgetAnswers = await inquirer.prompt([
            {
              type: 'list',
              name: 'departmentId',
              message: 'Select the department to view the total utilized budget:',
              choices: departmentChoices
            }
          ]);
          const totalBudget = await dbService.departmentService.getTotalUtilizedBudget(budgetAnswers.departmentId);
          console.log(chalk.blue(`Total Utilized Budget for ${totalBudget.Department}:`));
          console.log(`$${totalBudget['Total Utilized Budget']}`);
          break;
        case 'Add Department':
          await addDepartment(dbService.departmentService);
          break;
        case 'Add Role':
          await addRole(dbService.roleService, dbService.departmentService);
          break;
        case 'Add Employee':
          await addEmployee(dbService.employeeService, dbService.roleService);
          break;
        case 'Update Employee Role':
          await updateEmployeeRole(dbService.employeeService, dbService.roleService);
          break;
        case 'Update Employee Manager':
          await updateEmployeeManager(dbService.employeeService);
          break;
        case 'Delete Department':
          await deleteDepartment(dbService.departmentService);
          break;
        case 'Delete Role':
          await deleteRole(dbService.roleService);
          break;
        case 'Delete Employee':
          await deleteEmployee(dbService.employeeService);
          break;
        case 'Exit':
          exit = true; // Exit the main loop and end the program
          break;
      }
    }
  } catch (error) {
    // Handle errors and display them in red
    if (error instanceof Error) {
      console.error(chalk.red('Error:'), chalk.red(error.message));
    } else {
      console.error(chalk.red('Unknown error:'), error);
    }
  } finally {
    await pool.end(); // Close the database connection pool
  }
}

main(); // Start the application