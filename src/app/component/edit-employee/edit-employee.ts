import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule
} from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../services/employee.service';

@Component({
  selector: 'app-edit-employee',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-employee.html',
  styleUrl: './edit-employee.css'
})
export class EditEmployee implements OnInit {

  employeeForm!: FormGroup;
  employeeId!: number;

  loading = false;
  submitted = false;

  departments = [
    'Engineering',
    'Marketing',
    'Sales',
    'HR',
    'Operations',
    'Finance'
  ];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService
  ) {}

  get f() {
    return this.employeeForm.controls;
  }

  ngOnInit(): void {

    this.employeeId = Number(
      this.route.snapshot.paramMap.get('id')
    );

    this.employeeForm = this.fb.group({
      id: [0],
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: [
        '',
        [
          Validators.required,
          Validators.pattern(/^[0-9\-\+\s\(\)]{10,}$/)
        ]
      ],
      department: ['', Validators.required],
      position: ['', [Validators.required, Validators.minLength(3)]],
      salary: ['', [Validators.required, Validators.min(0)]],
      dateOfJoining: ['', Validators.required]
    });

    this.loadEmployee();
  }

  loadEmployee() {

    this.employeeService
      .getEmployeeById(this.employeeId)
      .subscribe({
        next: (employee: any) => {

          this.employeeForm.patchValue({
            id: employee.id,
            firstName: employee.firstName,
            lastName: employee.lastName,
            email: employee.email,
            phone: employee.phone,
            department: employee.department,
            position: employee.position,
            salary: employee.salary,
            dateOfJoining: employee.dateOfJoining
              ? employee.dateOfJoining.substring(0, 10)
              : ''
          });
        },

        error: (error) => {
          console.error(error);
          alert('Unable to load employee');
        }
      });
  }

  onSubmit() {

    this.submitted = true;

    if (this.employeeForm.invalid) {
      return;
    }

    this.loading = true;

    const employeeData = {
      id: this.employeeId,
      firstName: this.employeeForm.value.firstName,
      lastName: this.employeeForm.value.lastName,
      email: this.employeeForm.value.email,
      phone: this.employeeForm.value.phone,
      department: this.employeeForm.value.department,
      position: this.employeeForm.value.position,
      salary: Number(this.employeeForm.value.salary),
      dateOfJoining: this.employeeForm.value.dateOfJoining
    };

    this.employeeService
      .updateEmployee(this.employeeId, employeeData)
      .subscribe({
        next: (response: any) => {

          alert(response.message || 'Employee Updated Successfully');

          this.loading = false;

          this.router.navigate(['/view-employee']);
        },

        error: (error) => {

          console.error(error);

          this.loading = false;

          alert(
            error.error?.message ||
            'Failed to update employee'
          );
        }
      });
  }

  goBack() {
    this.router.navigate(['/view-employee']);
  }
}