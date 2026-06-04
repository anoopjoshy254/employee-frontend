import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Employee } from '../../models/employee.model';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-view-employee',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-employee.html',
  styleUrls: ['./view-employee.css']
})
export class ViewEmployee implements OnInit {

  employees: Employee[] = [];
  loading = false;

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private cdr: ChangeDetectorRef // 1. Added explicit change detector service
  ) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees() {
    this.loading = true;

    this.employeeService.getEmployees()
      .subscribe({
        next: (data) => {
          console.log('Employees from API:', data);
          this.employees = data;
          this.loading = false;
          
          // 2. Instructs Angular to re-scan the HTML template immediately 
          this.cdr.detectChanges(); 
        },
        error: (error) => {
          console.error('API Error:', error);
          this.loading = false;
          this.cdr.detectChanges();
        }
      });
  }

  editEmployee(id: number) {
    this.router.navigate(['/edit-employee', id]);
  }

  deleteEmployee(id: number) {
    if (!confirm('Are you sure you want to delete this employee?')) {
      return;
    }

    this.employeeService.deleteEmployee(id)
      .subscribe({
        next: () => {
          alert('Employee deleted successfully');
          this.loadEmployees();
        },
        error: (error) => {
          console.error(error);
          alert('Failed to delete employee');
        }
      });
  }

  goBack() {
    this.router.navigate(['/home']);
  }

  addNew() {
    this.router.navigate(['/add-employee']);
  }
}