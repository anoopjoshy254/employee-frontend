import { Injectable } from '@angular/core';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private employees: Employee[] = [
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@company.com',
      phone: '555-0101',
      department: 'Engineering',
      position: 'Senior Developer',
      dateOfJoining: '2022-01-15',
      salary: 95000
    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@company.com',
      phone: '555-0102',
      department: 'Marketing',
      position: 'Marketing Manager',
      dateOfJoining: '2021-06-20',
      salary: 75000
    },
    {
      id: 3,
      firstName: 'Michael',
      lastName: 'Johnson',
      email: 'michael.johnson@company.com',
      phone: '555-0103',
      department: 'Sales',
      position: 'Sales Executive',
      dateOfJoining: '2023-03-10',
      salary: 65000
    }
  ];

  private nextId = 4;

  constructor() {}

  getEmployees(): Employee[] {
    return this.employees;
  }

  getEmployeeById(id: number): Employee | undefined {
    return this.employees.find(emp => emp.id === id);
  }

  addEmployee(employee: Omit<Employee, 'id'>): Employee {
    const newEmployee: Employee = {
      id: this.nextId++,
      ...employee
    };
    this.employees.push(newEmployee);
    return newEmployee;
  }

  updateEmployee(id: number, employee: Omit<Employee, 'id'>): Employee | undefined {
    const index = this.employees.findIndex(emp => emp.id === id);
    if (index !== -1) {
      this.employees[index] = { id, ...employee };
      return this.employees[index];
    }
    return undefined;
  }

  deleteEmployee(id: number): boolean {
    const index = this.employees.findIndex(emp => emp.id === id);
    if (index !== -1) {
      this.employees.splice(index, 1);
      return true;
    }
    return false;
  }
}
