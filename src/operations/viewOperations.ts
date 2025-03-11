import { DatabaseService } from '../databaseServices';
import { displayTableWithoutIndex } from '../services/utils/displayTable';
import chalk from 'chalk';

export async function viewAllDepartments(dbService: DatabaseService) {
    const departments = await dbService.getAllDepartments();
    console.log(chalk.blue('All Departments:'));
    displayTableWithoutIndex(departments.map(department => ({
        'Department ID': department.id,
        'Department Name': department.department_name
    })));
}

export async function viewAllEmployees(dbService: DatabaseService) {
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
    displayTableWithoutIndex(employeesWithDetails);
}

export async function viewEmployeesByDepartment(dbService: DatabaseService) {
    const employeesByDepartment = await dbService.getEmployeesByDepartment();
    console.log(chalk.blue('Employees by Department:'));
    displayTableWithoutIndex(employeesByDepartment);
}

export async function viewEmployeesByManager(dbService: DatabaseService) {
    const employeesByManager = await dbService.getEmployeesByManager();
    console.log(chalk.blue('Employees by Manager:'));
    displayTableWithoutIndex(employeesByManager);
}

export async function viewAllRoles(dbService: DatabaseService) {
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
    displayTableWithoutIndex(rolesWithDepartments);
}