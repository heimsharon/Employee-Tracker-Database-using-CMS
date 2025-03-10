import inquirer from 'inquirer';

export async function promptForRoleDetails(departments: any[]) {
  const departmentChoices = departments.map(department => ({ name: `${department.department_name} (ID: ${department.department_id})`, value: department.department_id }));

  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'roleTitle',
      message: 'Enter the title of the new role:',
      validate: input => input.trim() !== '' || "Role title cannot be empty"
    },
    {
      type: 'input',
      name: 'salary',
      message: 'Enter the salary for the new role:',
      validate: input => !isNaN(input) && input.trim() !== '' || "Please enter a valid number for salary"
    },
    {
      type: 'list',
      name: 'departmentId',
      message: 'Select the department for the new role:',
      choices: departmentChoices
    }
  ]);

  return answers;
}