// This file contains the DatabaseService class, which acts as a central point to access the department, employee, and role services from the actual database
// It initializes instances of DepartmentService, EmployeeService, and RoleService using a provided database connection pool.


import { Pool } from 'pg';
import { DepartmentService } from './departmentServices';
import { EmployeeService } from './employeeServices';
import { RoleService } from './roleServices'

export class DatabaseService {
    public departmentService: DepartmentService;
    public employeeService: EmployeeService;
    public roleService: RoleService;

    constructor(pool: Pool) {
        this.departmentService = new DepartmentService(pool);
        this.employeeService = new EmployeeService(pool);
        this.roleService = new RoleService(pool);
    }
}