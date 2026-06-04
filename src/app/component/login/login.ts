import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  loginForm: FormGroup;
  submitted = false;
  loading = false;
  errorMessage = '';

  constructor(
      private fb: FormBuilder,
      private router: Router,
      private authService: AuthService
    ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
  this.submitted = true;

  if (this.loginForm.invalid) {
    return;
  }

  this.loading = true;

  const loginData = {
    email: this.loginForm.value.email,
    password: this.loginForm.value.password
  };

  this.authService.login(loginData).subscribe({
    next: (response) => {

      localStorage.setItem('token', response.token);

      alert(response.message);

      this.router.navigate(['/home']);

      this.loading = false;
    },
    error: (error) => {
    console.error(error);
    this.errorMessage =
      error.error?.message || 'Invalid Email or Password';
    this.loading = false;
  }
  });
}
  goToRegister() {
    this.router.navigate(['/register']);
  }
}
