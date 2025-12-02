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

  onSubmit(form: any) {
    // Add your login logic here
    const username = form.value.username;
    const password = form.value.password;

    // Hardcoded credentials
    const hardcodedUsername = 'rsbusinesstech';
    const hardcodedPassword = '@gmail.com';

    if (username === hardcodedUsername && password === hardcodedPassword) {
      alert('Login successful!');
      this.router.navigate(['/websiteManagementSystem/dashboard']);
    } else {
      alert('Invalid username or password. Please try again.');
    }
  }

  onRegister() {
    alert('Register button clicked!');
    // Add your register logic here
  }
}
