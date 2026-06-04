import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-add-employee',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-employee.html',
  styleUrl: './add-employee.css',
})
export class AddEmployee {
  employeeForm: FormGroup;
  submitted = false;
  loading = false;
  departments = ['Engineering', 'Marketing', 'Sales', 'HR', 'Operations', 'Finance'];

  constructor(
    private fb: FormBuilder,
    private router: Router,
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

  get f() {
    return this.employeeForm.controls;
  }

  onSubmit() {
  this.submitted = true;

  if (this.employeeForm.invalid) {
    return;
  }

  this.loading = true;

  const employeeData = {
    id: 0,
    firstName: this.employeeForm.value.firstName,
    lastName: this.employeeForm.value.lastName,
    email: this.employeeForm.value.email,
    phone: this.employeeForm.value.phone,
    department: this.employeeForm.value.department,
    position: this.employeeForm.value.position,
    salary: Number(this.employeeForm.value.salary),
    dateOfJoining: this.employeeForm.value.dateOfJoining
  };

  this.employeeService.addEmployee(employeeData)
    .subscribe({
      next: (response: any) => {

        alert(response.message || 'Employee Added Successfully');

        this.loading = false;

        this.router.navigate(['/view-employee']);
      },

      error: (error) => {

        console.error('API Error:', error);

        this.loading = false;

        alert(
          error.error?.message ||
          'Failed to add employee'
        );
      }
    });
}
  goBack() {
    this.router.navigate(['/home']);
  }
}
