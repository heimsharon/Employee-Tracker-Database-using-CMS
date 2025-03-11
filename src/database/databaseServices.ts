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