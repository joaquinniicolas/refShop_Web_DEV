import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service'
import { Router } from '@angular/router';
import { AuthenticationRequest, AuthenticationResponse } from 'src/app/models/auth.model';
import { FormGroup, NgForm } from '@angular/forms';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  hide = true;
  errorMessage: string = '';
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  login(username: string, password: string) {
    const request: AuthenticationRequest = { username, password };
    this.authService.login(request).subscribe((response: AuthenticationResponse) => {
      localStorage.setItem('token', response.token);
      this.router.navigate(['/home']);
    }, error => {
      console.error(error);
      this.errorMessage = 'Error de inicio de sesión. Por favor, verifica tus credenciales e intenta nuevamente.';
    });
  }

  onSubmit(loginForm: NgForm) {
    if (loginForm.valid) {
      const username = loginForm.value.username;
      const password = loginForm.value.password;
      this.login(username, password);
    } else {
      this.errorMessage = 'Por favor, completa correctamente los campos de usuario y contraseña.';
    }
  }


}
