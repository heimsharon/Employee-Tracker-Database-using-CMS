import inquirer from 'inquirer';

export async function promptForEmployeeDetails(roles: any[], employees: any[]) {
  const roleChoices = roles.map(role => ({
    name: `${role.role_title} (ID: ${role.role_id}, Dept: ${role.department_id})`,
    value: { roleId: role.role_id, departmentId: role.department_id }
  }));
  const employeeChoices = employees.map(employee => ({
    name: `${employee.first_name} ${employee.last_name} (ID: ${employee.id})`,
    value: employee.id
  }));

  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'firstName',
      message: 'Enter the first name of the new employee:',
      validate: input => input.trim() !== '' || "First name cannot be empty"
    },
    {
      type: 'input',
      name: 'lastName',
      message: 'Enter the last name of the new employee:',
      validate: input => input.trim() !== '' || "Last name cannot be empty"
    },
    {
      type: 'list',
      name: 'role',
      message: 'Select the role for the new employee:',
      choices: roleChoices
    },
    {
      type: 'list',
      name: 'managerId',
      message: 'Select the manager for the new employee (or leave blank if none):',
      choices: [{ name: 'None', value: null }, ...employeeChoices]
    }
  ]);

  return {
    ...answers,
    roleId: answers.role.roleId,
    departmentId: answers.role.departmentId
  };
}