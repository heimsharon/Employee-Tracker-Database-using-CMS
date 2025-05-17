// filepath: src/services/utils/colorUtils.ts
// This file contains functions to colorize department names, role names, salary values, and employee names for better readability in the console output.
import chalk from 'chalk';

// Colors department names orange
export function colorDepartmentName(departmentName: string): string {
    return chalk.hex('#FFA500')(departmentName);
}

// Colors role names green
export function colorRoleName(roleName: string): string {
    return chalk.hex('#00FF00')(roleName);
}

// Colors salary values yellow
export function colorSalary(salary: string | number): string {
    return chalk.hex('#FFFF00')(salary.toString());
}

// Colors employee names cyan
export function colorEmployeeName(employeeName: string): string {
    return chalk.hex('#00FFFF')(employeeName);
}