// src/app/login/login.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  onSubmit() {
    alert('Login form submitted!');
    // Add your login logic here
  }

  onRegister() {
    alert('Register button clicked!');
    // Add your register logic here
  }
}
