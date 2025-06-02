import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private API_URL = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient) { }

  // signIn(credentials: { email: String, password: String }) {
  //   this.http.post(`${this.API_URL}`, credentials)
  // }

  // getToken(): string | null {
  //   return localStorage.getItem('adminToken');
  // }

  // isLoggedIn(): boolean {
  //   return !!localStorage.getItem('adminToken');
  // }

  // logout(): void {
  //   return localStorage.removeItem('adminToken');
  // }

  loginAdmin(credentials: { email: string; password: string }) {
    return this.http.post<{ token: string, message: string }>(this.API_URL, credentials);
  }

  storeToken(token: string) {
    localStorage.setItem('authToken', token);
  }

  getToken() {
    return localStorage.getItem('authToken');
  }

  logout() {
    localStorage.removeItem('authToken');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }
}
