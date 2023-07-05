import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';



@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.authService.isTokenValid()) {
      // El token ha expirado, redirigir al usuario a la página de inicio de sesión
      this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
      this.snackBar.open('Su sesión ha expirado', 'Cerrar');
      return false;
    }
  
    const currentUser = this.authService.currentUser;
    if (currentUser) {
      // El usuario está autenticado, permitir el acceso a la ruta
      return true;
    }
  
    // El usuario no está autenticado, redirigir al usuario a la página de inicio de sesión
    this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
  

  // canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
  //   const currentUser = this.authService.currentUser;
  //   if (currentUser) {
  //     // El usuario está autenticado, permitir el acceso a la ruta
  //     return true;
  //   }

  //   // El usuario no está autenticado, redirigir a la página de inicio de sesión
  //   this.router.navigate(['/auth/login'], { queryParams: { returnUrl: state.url } });
  //   return false;
  // }
}
