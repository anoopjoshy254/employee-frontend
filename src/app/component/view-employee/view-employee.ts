import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-view-employee',
  imports: [CommonModule],
  templateUrl: './view-employee.html',
  styleUrl: './view-employee.css',
})
export class ViewEmployee implements OnInit {
  employees: Employee[] = [];

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadEmployees();
  }

  loadEmployees() {
    this.employees = this.employeeService.getEmployees();
  }

  editEmployee(id: number) {
    this.router.navigate(['/edit-employee', id]);
  }

  deleteEmployee(id: number) {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(id);
      this.loadEmployees();
    }
  }

  goBack() {
    this.router.navigate(['/home']);
  }

  addNew() {
    this.router.navigate(['/add-employee']);
  }
}
