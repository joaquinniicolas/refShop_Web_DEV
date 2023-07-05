import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service'


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  isHandset: boolean = true;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.isHandset = (window.innerWidth < 768);
    this.router.navigate(['/home/inicio']);

  }
  cerrarSesion() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }

}
