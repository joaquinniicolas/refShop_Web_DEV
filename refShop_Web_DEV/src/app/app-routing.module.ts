import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from 'src/app/auth/AuthGuard'
import { HomeContentComponent } from './home-content/home-content.component';
import { PedidoComponent } from './pedido/pedido.component';
import { MesaComponent } from './mesa/mesa.component';
import { PromocionComponent } from './promocion/promocion.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { PlatoComponent } from './plato/plato.component';
import { GestionUsuariosComponent } from './gestion-usuarios/gestion-usuarios.component'
//forms para agregar
import { AddCategoriaComponent } from 'src/app/categoria/add-categoria/add-categoria.component';
import { AddMesaComponent } from 'src/app/mesa/add-mesa/add-mesa.component';
import { AddUsuarioComponent } from 'src/app/gestion-usuarios/add-usuario/add-usuario.component';
//forms para editar
import { EditCategoriaComponent } from 'src/app/categoria/edit-categoria/edit-categoria.component'
import { EditUsuarioComponent } from 'src/app/gestion-usuarios/edit-usuario/edit-usuario.component'
//Canvas

const routes: Routes = [
  { path: 'auth/login', component: LoginComponent },
  {
    path: '', component: HomeComponent, children: [
      { path: 'home/inicio', component: HomeContentComponent },
      { path: 'home/pedidos', component: PedidoComponent },
      { path: 'home/promociones', component: PromocionComponent },
      { path: 'home/categorias', component: CategoriaComponent },
      { path: 'home/categorias/crearCategoria', component: AddCategoriaComponent },
      { path: 'home/categorias/editarCategoria/:id', component: EditCategoriaComponent },

      { path: 'home/platos', component: PlatoComponent },
      { path: 'home/mesas', component: MesaComponent },
      { path: 'home/mesas/AgregarMesa', component: AddMesaComponent },
      { path: 'home/usuarios', component: GestionUsuariosComponent },
      { path: 'home/usuarios/add', component: AddUsuarioComponent },
      { path: 'home/usuarios/edit/:id', component: EditUsuarioComponent }
    ], canActivate: [AuthGuard]

  }, /*, canActivate: [AuthGuard] */
  
  
  { path: '**', redirectTo: '', canActivate: [AuthGuard] }

];

@NgModule({
  imports: [RouterModule.forRoot(routes), CommonModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
