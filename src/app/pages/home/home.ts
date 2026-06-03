import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {
  totalEmployees = 0;
  totalDepartments = 0;

  constructor(
    private router: Router,
    private employeeService: EmployeeService
  ) {}

  ngOnInit() {
    this.loadDashboardData();
  }

  loadDashboardData() {
    const employees = this.employeeService.getEmployees();
    this.totalEmployees = employees.length;
    this.totalDepartments = new Set(employees.map(e => e.department)).size;
  }

  viewEmployees() {
    this.router.navigate(['/view-employee']);
  }

  addEmployee() {
    this.router.navigate(['/add-employee']);
  }

  logout() {
    this.router.navigate(['/login']);
  }
}
