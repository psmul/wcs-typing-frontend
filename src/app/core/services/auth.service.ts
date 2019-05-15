import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {User} from '../models/local/User';


@Injectable()
export class AuthService {

  resource = 'auth';

  constructor(private http: HttpClient) { }

  signUp(formValues: {username: string, password: string}): Observable<User> {
    const url = `${environment.api.url}/${this.resource}/register`;
    return this.http.post<User>(url, formValues);
  }

  logIn(formValues: {username: string, password: string}): Observable<any> {
    const url = `${environment.api.url}/${this.resource}/login`;
    return this.http.post<User>(url, formValues);
  }

  setToken(tokenName: string, token: string): void {
    return localStorage.setItem(tokenName, token);
  }

  removeToken(tokenName: string): void {
    return localStorage.removeItem(tokenName);
  }

  getToken(tokenName: string): string {
    return localStorage.getItem(tokenName);
  }

  setAuthToken(token: string): void {
    return this.setToken('auth-token', token);
  }

  getAuthToken(): string {
    return this.getToken('auth-token');
  }

  removeAuthToken(): void {
    return this.removeToken('auth-token');
  }

}
