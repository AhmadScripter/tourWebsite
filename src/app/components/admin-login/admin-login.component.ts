import { Component } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-login',
  imports: [FormsModule, CommonModule],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.css'
})
export class AdminLoginComponent {
  email = '';
  password = '';
  error = '';

  constructor(private authService: AdminService, private router: Router) {}

  login() {
    this.authService.loginAdmin({ email: this.email, password: this.password }).subscribe({
      next: (res) => {
        this.authService.storeToken(res.token);
        this.router.navigate(['/admin/dashboard']);
      },
      error: (err) => {
        this.error = err.error.message || 'Login failed';
      }
    });
  }
}
