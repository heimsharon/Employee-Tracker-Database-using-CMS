import chalk from 'chalk';

export function colorDepartmentName(departmentName: string): string {
    return chalk.hex('#FFA500')(departmentName); // Orange color
}

export function colorRoleName(roleName: string): string {
    return chalk.hex('#00FF00')(roleName); // Green color
}

export function colorSalary(salary: string | number): string {
    return chalk.hex('#FFFF00')(salary.toString()); // Yellow color
}

export function colorEmployeeName(employeeName: string): string {
    return chalk.hex('#00FFFF')(employeeName); // Cyan color
}