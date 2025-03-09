import inquirer from 'inquirer';

export async function promptForDeleteDepartment(departments: any[]) {
  const departmentChoices = departments.map(department => ({ name: `${department.department_name} (ID: ${department.department_id})`, value: department.department_id }));

  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'departmentId',
      message: 'Select the department to delete:',
      choices: departmentChoices
    }
  ]);

  return answers.departmentId;
}

export async function promptForDeleteRole(roles: any[]) {
  const roleChoices = roles.map(role => ({ name: `${role.role_title} (ID: ${role.role_id})`, value: role.role_id }));

  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'roleId',
      message: 'Select the role to delete:',
      choices: roleChoices
    }
  ]);

  return answers.roleId;
}

export async function promptForDeleteEmployee(employees: any[]) {
  const employeeChoices = employees.map(employee => ({ name: `${employee.first_name} ${employee.last_name} (ID: ${employee.id})`, value: employee.id }));

  const answers = await inquirer.prompt([
    {
      type: 'list',
      name: 'employeeId',
      message: 'Select the employee to delete:',
      choices: employeeChoices
    }
  ]);

  return answers.employeeId;
}