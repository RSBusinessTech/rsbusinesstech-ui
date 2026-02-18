// core/auth/services/token.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private ACCESS_TOKEN_KEY = 'access_token';
  private USERNAME_KEY = 'username';

  constructor() { }

  //access token
  setAccessToken(token: string) {
    localStorage.setItem(this.ACCESS_TOKEN_KEY, token);
  }

  getAccessToken(): string | null {
    return localStorage.getItem(this.ACCESS_TOKEN_KEY);
  }

  removeAccessToken() {
    localStorage.removeItem(this.ACCESS_TOKEN_KEY);
  }

  //username
  setUsername(username: string) {
    localStorage.setItem(this.USERNAME_KEY, username);
  }

  getUsername(): string | null {
    return localStorage.getItem(this.USERNAME_KEY);
  }

  removeUsername() {
    localStorage.removeItem(this.USERNAME_KEY);
  }

  clearAll() {
    this.removeAccessToken();
    this.removeUsername();
  }

   //check if user is logged in.
  isLoggedIn(): boolean {
    const token = this.getAccessToken();
    return !!token; //returns true if access token exists.
  }
}
