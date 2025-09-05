// src/app/login/login.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';  // <-- Import Router

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

   constructor(private router: Router) {}  // <-- Inject Router

  onSubmit() {
    alert('Login form submitted!');
    // Add your login logic here

     // Navigate to /dashboard
    this.router.navigate(['/products/onlineAppointmentBookingSystem/dashboard']);
  }

  onRegister() {
    alert('Register button clicked!');
    // Add your register logic here
  }
}
