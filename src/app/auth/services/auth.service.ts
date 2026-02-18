// core/auth/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { TokenService } from './token.service';
import { Router } from '@angular/router';

// interface LoginResponse {
//   accessToken: string;
// }

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // private BASE_URL = 'http://localhost:8080/jwt/public';
  private BASE_URL = 'https://rsbusinesstech-backend.onrender.com/jwt/public';
  private _username: string | null = null;

  constructor(private http: HttpClient, private tokenService: TokenService, private router: Router) { }

  login(username: string, password: string): Observable<any> {
  return this.http.post<{ accessToken: string }>(
    `${this.BASE_URL}/login`,
    { username, password },
    { withCredentials: true }  //ensures HttpOnly refreshToken cookie is sent and received correctly.
  ).pipe(
    tap(res => {
      this.tokenService.setAccessToken(res.accessToken);  //only store "access-token", "refresh-token" is handled by cookie and is inaccessible to JavaScript.
    }),
    catchError(err => throwError(() => err))
  );
}


logout(): void {
  this.http.request('DELETE', `${this.BASE_URL}/logout`, { withCredentials: true }).subscribe();
  this.tokenService.clearAll();

  //redirect user to login page/
  this.router.navigate(['/propertyManagementSystem/login']);
}

 refreshAccessToken(): Observable<string> {
  return this.http
    .post<{ accessToken: string }>(
      `${this.BASE_URL}/refresh-access-token`,
      {},
      { withCredentials: true }  //allows HttpOnly cookie to send over cross-site, otherwise it will not be sent to the backend server by the browser.
    )
    .pipe(
      map(res => res.accessToken),  //extract token.
      tap(token => this.tokenService.setAccessToken(token)), //save it.
      catchError(err => {
        this.logout();
        return throwError(() => err);
      })
    );
}

  getAccessToken(): string | null {
    return this.tokenService.getAccessToken();
  }

  //set username after login.
  setUsername(username: string) {
    this._username = username;
    //optional: store in localStorage/sessionStorage to persist on reload.
    localStorage.setItem('username', username);
  }

  //get username.
  getUsername(): string | null {
    if (!this._username) {
      this._username = localStorage.getItem('username');
    }
    return this._username;
  }
}
