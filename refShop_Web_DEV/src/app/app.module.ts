import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { AuthInterceptor } from './auth/auth.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthGuard } from 'src/app/auth/AuthGuard';
//Angular Maerial
import { MaterialModule } from 'src/app/Material Modules/material.modules';
//SCREEN MODULES
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home.component';
import { HomeContentComponent } from './home-content/home-content.component';
import { PedidoComponent } from './pedido/pedido.component';
import { MesaComponent } from './mesa/mesa.component';
import { PromocionComponent } from './promocion/promocion.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { PlatoComponent } from './plato/plato.component';
import { AgregarPedidoComponentComponent } from './pedido/agregar-pedido-component/agregar-pedido-component.component';
import { AddCategoriaComponent } from './categoria/add-categoria/add-categoria.component';
import { EditCategoriaComponent } from './categoria/edit-categoria/edit-categoria.component';
import { FormValidationService } from './services/validateForm/FormValidationService';
import { PopupComponent } from 'src/app/categoria/DeletePopup/PopupComponent';
import { CanvasComponent } from './models/canvas/canvas.component';
import { TooltipComponent } from './services/tooltip/tooltip.component'
import { GestorService } from 'src/app/services/gestor.service';
import { AddMesaComponent } from './mesa/add-mesa/add-mesa.component';
import { GestionUsuariosComponent } from './gestion-usuarios/gestion-usuarios.component';
import { AddUsuarioComponent } from './gestion-usuarios/add-usuario/add-usuario.component';
import { EditUsuarioComponent } from './gestion-usuarios/edit-usuario/edit-usuario.component'
// SERVICES
import { TokenInterceptor } from './services/TokenInterceptor';

//OTHER


export function tokenGetter() {
  return localStorage.getItem('token');
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HomeContentComponent,
    PedidoComponent,
    MesaComponent,
    PromocionComponent,
    CategoriaComponent,
    PlatoComponent,
    AgregarPedidoComponentComponent,
    AddCategoriaComponent,
    EditCategoriaComponent,
    PopupComponent,
    CanvasComponent,
    TooltipComponent,
    AddMesaComponent,
    GestionUsuariosComponent,
    AddUsuarioComponent,
    EditUsuarioComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['https://localhost:7158;http://localhost:5158'],
        disallowedRoutes: []
      }
    }),
    BrowserAnimationsModule,

  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }, AuthGuard,
    FormValidationService,
    {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

