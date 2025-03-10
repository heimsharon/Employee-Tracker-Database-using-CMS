import inquirer from 'inquirer';

export async function promptForDepartmentName() {
  const answers = await inquirer.prompt([
    {
      type: 'input',
      name: 'departmentName',
      message: 'Enter a name for the new department:',
      validate: input => input.trim() !== '' || "Department name cannot be empty."
    }
  ]);

  return answers.departmentName;
}