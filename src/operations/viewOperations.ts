import { DatabaseService } from '../database/databaseServices';
import { displayTableWithoutIndex } from '../services/utils/displayTable';
import chalk from 'chalk';
import { Role, Department } from '../database/roleServices'

export async function viewAllDepartments(departmentService: DatabaseService['departmentService']) {
    const departments = await departmentService.getAllDepartments();
    console.log(chalk.blue('All Departments:'));
    displayTableWithoutIndex(departments.map(department => ({
        'Department ID': department.id,
        'Department Name': department.department_name
    })));
}

export async function viewAllEmployees(employeeService: DatabaseService['employeeService'], roleService: DatabaseService['roleService'], departmentService: DatabaseService['departmentService']) {
    const employees = await employeeService.getAllEmployees();
    const rolesForEmployees = await roleService.getAllRoles();
    const departmentsForEmployees = await departmentService.getAllDepartments();
    const employeesWithDetails = employees.map(employee => {
        const role = rolesForEmployees.find((role: Role) => role.id === employee.role_id);
        const department = role ? departmentsForEmployees.find((dept: Department) => dept.id === role.department_id) : null;
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

export async function viewEmployeesByDepartment(employeeService: DatabaseService['employeeService']) {
    const employeesByDepartment = await employeeService.getEmployeesByDepartment();
    console.log(chalk.blue('Employees by Department:'));
    displayTableWithoutIndex(employeesByDepartment);
}

export async function viewEmployeesByManager(employeeService: DatabaseService['employeeService']) {
    const employeesByManager = await employeeService.getEmployeesByManager();
    console.log(chalk.blue('Employees by Manager:'));
    displayTableWithoutIndex(employeesByManager);
}

export async function viewAllRoles(roleService: DatabaseService['roleService'], departmentService: DatabaseService['departmentService']) {
    const roles = await roleService.getAllRoles();
    const departmentsForRoles = await departmentService.getAllDepartments();
    const rolesWithDepartments = roles.map(role => {
        const department = departmentsForRoles.find((dept: Department) => dept.id === role.department_id);
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