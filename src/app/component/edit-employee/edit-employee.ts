import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';

@Component({
  selector: 'app-edit-employee',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './edit-employee.html',
  styleUrl: './edit-employee.css',
})
export class EditEmployee implements OnInit {
  employeeForm: FormGroup;
  submitted = false;
  loading = false;
  employeeId: number = 0;
  employee: Employee | undefined;
  departments = ['Engineering', 'Marketing', 'Sales', 'HR', 'Operations', 'Finance'];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private employeeService: EmployeeService
  ) {
    this.employeeForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern(/^[0-9\-\+\s\(\)]{10,}$/)]],
      department: ['', Validators.required],
      position: ['', [Validators.required, Validators.minLength(3)]],
      dateOfJoining: ['', Validators.required],
      salary: ['', [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.employeeId = Number(params['id']);
      this.loadEmployee();
    });
  }

  loadEmployee() {
    this.employee = this.employeeService.getEmployeeById(this.employeeId);
    if (this.employee) {
      this.employeeForm.patchValue({
        firstName: this.employee.firstName,
        lastName: this.employee.lastName,
        email: this.employee.email,
        phone: this.employee.phone,
        department: this.employee.department,
        position: this.employee.position,
        dateOfJoining: this.employee.dateOfJoining,
        salary: this.employee.salary
      });
    } else {
      this.router.navigate(['/view-employee']);
    }
  }

  get f() {
    return this.employeeForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.employeeForm.invalid) return;

    this.loading = true;
    setTimeout(() => {
      this.employeeService.updateEmployee(this.employeeId, this.employeeForm.value);
      this.router.navigate(['/view-employee']);
      this.loading = false;
    }, 500);
  }

  goBack() {
    this.router.navigate(['/view-employee']);
  }
}
