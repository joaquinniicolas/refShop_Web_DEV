import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthenticationRequest, AuthenticationResponse, User } from 'src/app/models/auth.model';
import jwt_decode from 'jwt-decode';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { TokenPayload } from './models/auth.model';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = 'http://localhost:5158/';
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser$: Observable<User>;
  private tokenRenewalTimer: any;

  constructor(private http: HttpClient) {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}') as User;
    this.currentUserSubject = new BehaviorSubject<User>(currentUser);
    this.currentUser$ = this.currentUserSubject.asObservable();
  }

  login(request: AuthenticationRequest): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(`${this.baseUrl}api/user/login`, request)
      .pipe(map(response => {
        const user = this.parseUserFromToken(response.token);
        this.updateCurrentUser(user);
        localStorage.setItem('token', response.token);

        this.startTokenRenewalTimer();
        setInterval(() =>{
          this.startTokenRenewalTimer();

        },30 * 60 * 1000);
        return response;
      }));
  }

  private parseUserFromToken(token: string): User {
    const tokenPayload = jwt_decode(token) as TokenPayload;
    const { nameid, sub, email, firstName, lastName } = tokenPayload;
  
    return {
      id: parseInt(nameid),
      userName: sub,
      email: email,
      firstName: firstName,
      lastName: lastName,
      userRoleId: 1, // o asigna el valor correcto obtenido de los datos del token
      phone: '',
      photoPath: '',
      createdAt: this.currentUser?.createdAt, // Acceder directamente a la propiedad del tokenPayload
      updatedAt: this.currentUser?.updatedAt // Acceder directamente a la propiedad del tokenPayload
    };
  }
  

  updateCurrentUser(user: User) {
    this.currentUserSubject.next(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  register(request: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/register`, request);
  }

  logout() {
    localStorage.removeItem('token');
  }

  get isLoggedIn(): boolean {
    return localStorage.getItem('token') !== null;
  }

  get currentUser(): User | null {
    const token = localStorage.getItem('token');
    if (!token) {
      return null;
    }
    const tokenPayload = jwt_decode(token) as TokenPayload;
    return {
      id: parseInt(tokenPayload.nameid),
      userName: tokenPayload.sub,
      email: tokenPayload.email,
      firstName: tokenPayload.firstName,
      lastName: tokenPayload.lastName,
      userRoleId: 1, // o asigna el valor correcto obtenido de los datos del token
      phone: '',
      photoPath: '',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
  }
  getToken(): string {
    const token = localStorage.getItem('token');
    return token !== null ? token : '';
  }

  isTokenValid(): boolean {
    const token = this.getToken();
    if (!token) {
      // El token no está presente en el almacenamiento local
      return false;
    }
  
    const tokenExpiration = this.getTokenExpiration(token);
    const currentDateTime = new Date();
  
    if (tokenExpiration) {
      return currentDateTime <= tokenExpiration;
    }
  
    // Si tokenExpiration es null, devolver false o cualquier otro valor que indique que el token no es válido.
    return false;
  }


  renewToken(): void {
    // Realiza una solicitud HTTP POST para renovar el token
    this.http.post(`${this.baseUrl}api/gestionusuarios/renew`, {}).subscribe((response: any) => {
      // Actualiza el token en tu servicio de autenticación
      this.updateToken(response.token);

      // Reinicia el temporizador de renovación de token
      this.startTokenRenewalTimer();
    });
  }

  updateToken(token: string): void {
    localStorage.setItem('token', token);
  }

  startTokenRenewalTimer(): void {
    // Obtén el token actual de tu servicio de autenticación
    const currentToken = this.getToken();
    
    // Obtén la fecha de expiración del token actual
    const tokenExpiration = this.getTokenExpiration(currentToken);

    if (tokenExpiration) {
      // Calcula el tiempo de espera hasta la renovación del token
      const renewalTime = tokenExpiration.getTime() - Date.now() - 30000; // Renovar el token 30 segundos antes de que expire
      const timeRemaining = tokenExpiration.getTime() - Date.now();
      if (timeRemaining < renewalTime) {
        this.renewToken();
        return;
      }
      // Reinicia el temporizador de renovación de token
      clearTimeout(this.tokenRenewalTimer);
      this.tokenRenewalTimer = setTimeout(() => this.renewToken(), renewalTime);
    }
  }

  

  getTokenExpiration(token: string): Date | null {
    const tokenData = this.parseJwt(token);

    if (tokenData && tokenData.exp) {
      const expirationTimestamp = Number(tokenData.exp) * 1000; // El valor de 'exp' está en segundos, conviértelo a milisegundos
      return new Date(expirationTimestamp);
    }

    return null;
  }

  parseJwt(token: string): any {
    const tokenParts = token.split('.');
    if (tokenParts.length !== 3) {
      throw new Error('Invalid token format');
    }
  
    const base64Url = tokenParts[1];
    if (!base64Url) {
      throw new Error('Invalid token');
    }
  
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  
    return JSON.parse(jsonPayload);
  }
  

  

}

