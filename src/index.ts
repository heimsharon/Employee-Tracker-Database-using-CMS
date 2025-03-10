import { Pool } from 'pg';
import { DatabaseService } from './databaseServices';
import { mainMenu } from './services/prompts';
import { promptForDepartmentName } from './services/addDepartmentPrompt';
import { promptForRoleDetails } from './services/addRolePrompt';
import { promptForEmployeeDetails } from './services/addEmployeePrompt';
import { promptForUpdateEmployeeRole, promptForUpdateEmployeeManager } from './services/updateEmployeePrompt';
import { promptForDeleteDepartment, promptForDeleteRole, promptForDeleteEmployee } from './services/deletePrompts';
import chalk from 'chalk';
import inquirer from 'inquirer';

const dbConfig = {
  user: 'heimsharon',
  host: 'localhost',
  database: 'employees_db',
  password: 'Thisisstupid11',
  port: 5432,
};

async function main() {
  const pool = new Pool(dbConfig);
  const dbService = new DatabaseService(pool);

  try {
    await pool.connect();

    let exit = false;
    while (!exit) {
      const action = await mainMenu();

      switch (action) {
        case 'View All Departments':
          const departments = await dbService.getAllDepartments();
          console.log(chalk.blue('All Departments:'));
          console.table(departments.map(department => ({
            'Department ID': department.id,
            'Department Name': department.department_name
          })));
          break;
        case 'View All Employees':
          const employees = await dbService.getAllEmployees();
          const rolesForEmployees = await dbService.getAllRoles();
          const departmentsForEmployees = await dbService.getAllDepartments();
          const employeesWithDetails = employees.map(employee => {
            const role = rolesForEmployees.find(role => role.id === employee.role_id);
            const department = role ? departmentsForEmployees.find(dept => dept.id === role.department_id) : null;
            const manager = employees.find(emp => emp.id === employee.manager_id);
            return {
              'Employee ID': employee.id,
              'First Name': employee.first_name,
              'Last Name': employee.last_name,
              'Job Title': role ? role.role_title : 'Unknown',
              'Department': department ? department.department_name : 'Unknown',
              'Salary': role ? role.salary : 'Unknown',
              'Manager': manager ? `${manager.first_name} ${manager.last_name}` : 'None'
            };
          });
          console.log(chalk.blue('All Employees:'));
          console.table(employeesWithDetails);
          break;
        case 'View Employees by Department':
          const employeesByDepartment = await dbService.getEmployeesByDepartment();
          console.log(chalk.blue('Employees by Department:'));
          console.table(employeesByDepartment);
          break;
        case 'View Employees by Manager':
          const employeesByManager = await dbService.getEmployeesByManager();
          console.log(chalk.blue('Employees by Manager:'));
          console.table(employeesByManager);
          break;
        case 'View All Roles':
          const roles = await dbService.getAllRoles();
          const departmentsForRoles = await dbService.getAllDepartments();
          const rolesWithDepartments = roles.map(role => {
            const department = departmentsForRoles.find(dept => dept.id === role.department_id);
            return {
              'Role ID': role.id,
              'Job Title': role.role_title,
              'Department': department ? department.department_name : 'Unknown',
              'Salary': role.salary
            };
          });
          console.log(chalk.blue('All Roles:'));
          console.table(rolesWithDepartments);
          break;
        case 'View Total Utilized Budget of a Department':
          const allDepartmentsForBudget = await dbService.getAllDepartments();
          const departmentIdForBudget = await promptForDeleteDepartment(allDepartmentsForBudget);
          const totalBudget = await dbService.getTotalUtilizedBudget(parseInt(departmentIdForBudget));
          console.log(chalk.blue(`Total Utilized Budget for Department ID ${departmentIdForBudget}:`));
          console.table(totalBudget);
          break;
        case 'Add Department':
          const departmentName = await promptForDepartmentName();
          await dbService.addDepartment(departmentName);
          console.log(chalk.green('Added new department'));
          break;
        case 'Add Role':
          const existingDepartments = await dbService.getAllDepartments();
          const roleDetails = await promptForRoleDetails(existingDepartments);
          await dbService.addRole(roleDetails.roleTitle, parseFloat(roleDetails.salary), parseInt(roleDetails.departmentId));
          console.log(chalk.green('Added new role'));
          break;
        case 'Add Employee':
          const existingRoles = await dbService.getAllRoles();
          const existingEmployees = await dbService.getAllEmployees();
          const employeeDetails = await promptForEmployeeDetails(existingRoles, existingEmployees);
          await dbService.addEmployee(employeeDetails.firstName, employeeDetails.lastName, parseInt(employeeDetails.roleId), employeeDetails.managerId);
          console.log(chalk.green('Added new employee'));
          break;
        case 'Update Employee Role':
          const allEmployeesForRoleUpdate = await dbService.getAllEmployees();
          const allRolesForRoleUpdate = await dbService.getAllRoles();
          const updateRoleDetails = await promptForUpdateEmployeeRole(allEmployeesForRoleUpdate, allRolesForRoleUpdate);
          await dbService.updateEmployeeRole(parseInt(updateRoleDetails.employeeId), parseInt(updateRoleDetails.roleId));
          console.log(chalk.green('Updated employee role'));
          break;
        case 'Update Employee Manager':
          const allEmployeesForManagerUpdate = await dbService.getAllEmployees();
          const updateManagerDetails = await promptForUpdateEmployeeManager(allEmployeesForManagerUpdate);
          await dbService.updateEmployeeManager(parseInt(updateManagerDetails.employeeId), updateManagerDetails.managerId !== null ? parseInt(updateManagerDetails.managerId) : null);
          console.log(chalk.green('Updated employee manager'));
          break;
        case 'Delete Department':
          const allDepartments = await dbService.getAllDepartments();
          const deleteDepartmentId = await promptForDeleteDepartment(allDepartments);
          try {
            await dbService.deleteDepartment(parseInt(deleteDepartmentId));
            console.log(chalk.green('Deleted department'));
          } catch (error) {
            if (error instanceof Error) {
              console.error(chalk.red(error.message));
            } else {
              console.error(chalk.red('Unknown error'), error);
            }
          }
          break;

        case 'Delete Role':
          const allRoles = await dbService.getAllRoles();
          const deleteRoleId = await promptForDeleteRole(allRoles);
          try {
            await dbService.deleteRole(parseInt(deleteRoleId));
            console.log(chalk.green('Deleted role'));
          } catch (error) {
            if (error instanceof Error) {
              console.error(chalk.red(error.message));
            } else {
              console.error(chalk.red('Unknown error'), error);
            }
          }
          break;

        case 'Delete Employee':
          const allEmployees = await dbService.getAllEmployees();
          const deleteEmployeeId = await promptForDeleteEmployee(allEmployees);
          await dbService.deleteEmployee(parseInt(deleteEmployeeId));
          console.log(chalk.green('Deleted employee'));
          break;
        case 'Exit':
          exit = true;
          break;
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(chalk.red('Error:'), chalk.red(error.message));
    } else {
      console.error(chalk.red('Unknown error:'), error);
    }
  } finally {
    await pool.end();
  }
}

main();