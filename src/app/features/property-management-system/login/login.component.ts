import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private router: Router, private authService: AuthService) {}

  onSubmit(form: any) {
    // Add your login logic here
    const username = form.value.username;
    const password = form.value.password;

    // Hardcoded credentials
    const hardcodedUsername = 'vyenpropertyadvisor';
    const hardcodedUsernamedemo = 'rsbusinesstech';
    const hardcodedPassword = '@gmail.com';

    if ((username === hardcodedUsername || username ===hardcodedUsernamedemo) && password === hardcodedPassword) {
      this.authService.setUsername(username);  // store logged-in username
      alert('Login successful!');
      this.router.navigate(['/propertyManagementSystem/dashboard']);
    } else {
      alert('Invalid username or password. Please try again.');
    }
  }

  onRegister() {
    alert('Register button clicked!');
    // Add your register logic here
  }
}
