import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _username: string | null = null;

  constructor() {}

  // Set username after login
  setUsername(username: string) {
    this._username = username;
    // Optional: store in localStorage/sessionStorage to persist on reload
    localStorage.setItem('username', username);
  }

  // Get username
  getUsername(): string | null {
    if (!this._username) {
      this._username = localStorage.getItem('username');
    }
    return this._username;
  }

  // Check if logged in
  isLoggedIn(): boolean {
    return !!this.getUsername();
  }

  // Logout
  logout() {
    this._username = null;
    localStorage.removeItem('username');
  }
}
