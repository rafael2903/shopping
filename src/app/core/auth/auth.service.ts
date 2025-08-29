import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { LoginResponseUserDto } from 'app/shared/types/login-response-user.dto';
import { LoginDto } from 'app/shared/types/login.dto';
import { environment } from 'environments/environment.development';
import { jwtDecode } from 'jwt-decode';
import { map, Observable, tap } from 'rxjs';
import { User } from './../../shared/models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private httpClient = inject(HttpClient);
  private readonly API_URL = `${environment.apiUrl}/auth`;
  private user = signal<User | null>(null);
  public readonly user$ = this.user.asReadonly();
  isUserLogged = computed(() => !!this.user());
  isAdmin = computed(() => this.user()?.username === 'johnd');

  constructor() {
    this.loadUserFromLocalStorage();
  }

  loadUserFromLocalStorage() {
    const token = localStorage.getItem('token');
    if (token) {
      const user = this.decodeToken(token);
      this.user.set(user);
    }
  }

  login(credentials: LoginDto): Observable<User | null> {
    return this.httpClient
      .post<{ token: string }>(`${this.API_URL}/login`, credentials)
      .pipe(
        tap(({ token }) => {
          this.saveToken(token);
        }),
        map(({ token }) => {
          return this.decodeToken(token);
        }),
        tap((user) => {
          this.user.set(user);
        })
      );
  }

  decodeToken(token: string): User | null {
    if (!token) return null;
    const userData = jwtDecode<LoginResponseUserDto>(token);
    const user = { id: userData.sub, username: userData.user };
    return user;
  }

  saveToken(token: string) {
    if (!token) return;
    localStorage.setItem('token', token);
  }

  logout() {
    this.user.set(null);
    localStorage.removeItem('token');
  }
}
