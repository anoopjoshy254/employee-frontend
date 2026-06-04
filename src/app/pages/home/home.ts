
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home implements OnInit {

  totalEmployees = 0;
  totalDepartments = 0;
  latestEmployees: Employee[] = [];

  constructor(
    private router: Router,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {

    const token = localStorage.getItem('token');

    if (!token) {
      this.router.navigate(['/login']);
      return;
    }

    this.loadDashboardData();
  }

  loadDashboardData(): void {

    this.employeeService.getDashboardData()
      .subscribe({
        next: (data) => {
          this.totalEmployees = Number(data?.totalEmployees ?? 0);
          this.totalDepartments = Number(data?.totalDepartments ?? 0);
          this.latestEmployees = Array.isArray(data?.latestEmployees)
            ? data.latestEmployees
            : [];

          console.log('Dashboard Data:', data);
        },

        error: (error) => {
          console.error(error);
          alert('Failed to load dashboard data');
        }
      });
  }

  viewEmployees() {
    this.router.navigate(['/view-employee']);
  }

  addEmployee() {
    this.router.navigate(['/add-employee']);
  }

  logout() {
    localStorage.removeItem('token');
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}