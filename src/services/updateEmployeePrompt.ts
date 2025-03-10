import inquirer from 'inquirer';

export async function promptForUpdateEmployeeRole(employees: any[], roles: any[]) {
  const employeeChoices = employees.map(employee => ({ name: `${employee.first_name} ${employee.last_name} (ID: ${employee.id})`, value: employee.id }));
  const roleChoices = roles.map(role => ({ name: `${role.role_title} (ID: ${role.id})`, value: role.id }));

  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'employeeId',
      message: 'Select an employee to update:',
      choices: employeeChoices
    },
    {
      type: 'list',
      name: 'roleId',
      message: 'Select the new role for the employee:',
      choices: roleChoices
    }
  ]);

  return answers;
}

export async function promptForUpdateEmployeeManager(employees: any[]) {
  const employeeChoices = employees.map(employee => ({ name: `${employee.first_name} ${employee.last_name} (ID: ${employee.id})`, value: employee.id }));
  const managerChoices = [{ name: 'None', value: null }, ...employeeChoices];

  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'employeeId',
      message: 'Select an employee to update:',
      choices: employeeChoices
    },
    {
      type: 'list',
      name: 'managerId',
      message: 'Select a new manager for the employee:',
      choices: managerChoices
    }
  ]);

  return answers;
}