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
    if (this.employeeForm.invalid) return;

    this.loading = true;
    setTimeout(() => {
      this.employeeService.addEmployee(this.employeeForm.value);
      this.router.navigate(['/view-employee']);
      this.loading = false;
    }, 500);
  }

  goBack() {
    this.router.navigate(['/home']);
  }
}
