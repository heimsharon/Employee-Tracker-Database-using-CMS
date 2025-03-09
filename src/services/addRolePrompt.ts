import inquirer from 'inquirer';

export async function promptForRoleDetails(departments: any[]) {
  const departmentChoices = departments.map(department => ({ name: `${department.department_name} (ID: ${department.department_id})`, value: department.department_id }));

  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'roleTitle',
      message: 'Enter the title of the new role:'
    },
    {
      type: 'input',
      name: 'salary',
      message: 'Enter the salary for the new role:'
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