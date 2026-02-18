// login.component.ts
import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  loading: boolean = false;
  errorMessage: string = '';
  returnUrl: string = '/propertyManagementSystem/dashboard/'; // default redirect after login

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
  ) { }

  ngOnInit() {
    // Get the return URL from query parameters if any
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || this.returnUrl;
  }

  onSubmit(form: any) {
    if (form.invalid) return;

    const username = form.value.username;
    const password = form.value.password;

    this.loading = true;
    this.errorMessage = '';

    this.authService.login(username, password).subscribe({
      next: (res) => {
        this.loading = false;
        //store username as agentId.
        this.authService.setUsername(username);

        //navigate to returnUrl or default dashboard
        this.router.navigateByUrl(`${this.returnUrl}/${username}`);
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = (err && err.error && err.error.message) 
          ? err.error.message 
          : 'Login failed. Please check your credentials.';
        alert(this.errorMessage);
      }
    });
  }

  onRegister() {
    alert('Register button clicked!');
    // Add your registration logic if needed
  }
}
