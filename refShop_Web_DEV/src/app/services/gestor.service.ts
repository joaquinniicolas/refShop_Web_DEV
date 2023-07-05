import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, throwError } from 'rxjs';
import { AddCategoria, Categoria } from '../models/restaurant/Categoria';
import { Mesa } from '../models/restaurant/Mesa';
import { Pedido } from '../models/restaurant/Pedido';
import { Plato } from '../models/restaurant/Plato';
import { Promocion } from '../models/restaurant/Promocion';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { User } from '../models/auth.model';
import { Roles } from '../models/Roles';
import { RegisterDto } from '../models/RegisterUser';
import { Permissions} from '../models/Permissions';
import { RolePermission } from '../models/RolePermission';



@Injectable({
  providedIn: 'root'
})
export class GestorService {

  private _urlBase = 'http://localhost:5158/api';
  filaEditada: number | undefined;



  constructor(private _http: HttpClient,
    private _authService: AuthService,
    private _router: Router,
     ) { }


  

  navigateTo(route: string) {
    this._router.navigate([route]);
  }

  public handleError(error: HttpErrorResponse): Observable<any> {
    let errorMessage: string;

    if (error.status === 401) {
      // Si el error es "Unauthorized", podemos redirigir al usuario a la página de inicio de sesión
      this._router.navigate(['auth/login']);
    } else if (error.status === 404) {
      // Si el error es "Not Found", podemos mostrar un mensaje de error específico en la pantalla
      errorMessage = 'No se encontró el recurso solicitado. Por favor, inténtelo de nuevo más tarde.';
      console.log(error);
    } else {
      errorMessage = 'Algo salió mal. Por favor, inténtelo de nuevo más tarde.';
      console.log(error);
    }

    // Regresamos un observable con un error
    console.log(error);

    return throwError('Algo salió mal. Por favor, inténtelo de nuevo más tarde.');
  }


  private getToken() {
    const token = this._authService.getToken();
    return token;
  }


  private getHeader() {
    const header = new HttpHeaders().set('Authorization', `Bearer ${this.getToken()}`);

    return header;
  }

  //

  //GestionUsuarios
  getUsers(): Observable<User[]> {
    return this._http.get<User[]>(`${this._urlBase}/gestionusuarios/getUsers`).pipe(
      catchError(this.handleError)
    );
  }

  getRoles(): Observable<Roles[]> {
    return this._http.get<Roles[]>(`${this._urlBase}/gestionusuarios/getRoles`).pipe(
      catchError(this.handleError)
    );
  }

  getRolesPermission(): Observable<RolePermission[]> {
    return this._http.get<RolePermission[]>(`${this._urlBase}/gestionusuarios/getRolePermissions`).pipe(
      catchError(this.handleError)
    );
  }

  getPermissions(): Observable<Permissions[]>{
    return this._http.get<Permissions[]>(`${this._urlBase}/gestionusuarios/getPermissions`).pipe(
      catchError(this.handleError)
    );
  }
  checkUserName(user: string): Observable<boolean> {
    
    const headers = this.getHeader();
    const url = `${this._urlBase}/gestionusuarios/checkUserName?userName=${encodeURIComponent(user)}`;

    return this._http.get<boolean>(url).pipe(
      catchError(this.handleError)
    );
  }

  registerUser(registerDto: RegisterDto, photoUrl: string): Observable<RegisterDto> {
    const headers = this.getHeader();
    const params = new HttpParams().set('photoUrl', photoUrl);


    return this._http.post<RegisterDto>(`${this._urlBase}/gestionusuarios/register`, registerDto,{headers}).pipe(
      catchError(this.handleError)
    );
  }


  uploadPhoto(username:string,photo: File | null): Observable<string> {
    const headers = this.getHeader();

    const formData = new FormData();
    const params = new HttpParams().set('username', username);


    if (photo) {
      formData.append('photo', photo);
    }
    return this._http.post<string>(`${this._urlBase}/gestionusuarios/save`, formData, {headers}).pipe(
      catchError(this.handleError)
    );

  }





  



  //CATEGORIAS
  getCategorias(): Observable<Categoria[]> {
    const headers = this.getHeader();
    return this._http.get<Categoria[]>(`${this._urlBase}/categorias/getCategorias`, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  getCategoria(id: number): Observable<Categoria> {
    const headers = this.getHeader();
    return this._http.get<Categoria>(`${this._urlBase}/categorias/getCategoria/${id}`, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  addCategoria(categoria: AddCategoria): Observable<AddCategoria> {
    const headers = this.getHeader();
    return this._http.post<AddCategoria>(`${this._urlBase}/categorias/createCategoria`, categoria, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  updateCategoria(id: number, categoria: AddCategoria): Observable<AddCategoria> {
    const headers = this.getHeader();
    return this._http.put<AddCategoria>(`${this._urlBase}/categorias/updateCategoria/${id}`, categoria, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  deleteCategoria(id: number): Observable<void> {
    const headers = this.getHeader();
    return this._http.delete<void>(`${this._urlBase}/categorias/deleteCategoria/${id}`, { headers }).pipe(
      catchError(this.handleError)
    );
  }


  // MESAS

  //getCategorias(): Observable<Categoria[]> {
  //  const headers = this.getHeader();
  //  return this._http.get<Categoria[]>(`${this._urlBase}/categorias/getCategorias`, { headers }).pipe(
  //    catchError(this.handleError)
  //  );
  //}

  getMesas(page: number, pageSize: number): Observable<Mesa[]> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());
    const headers = this.getHeader();
    return this._http.get<Mesa[]>(`${this._urlBase}/Mesa/getMesas`, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  getMesaUser(): Observable<User> {
    const headers = this.getHeader();
    return this._http.get<User>(`${this._urlBase}/GestionUsuarios/getUser`, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  getMesaMozo(): Observable<User> {
    const headers = this.getHeader();
    return this._http.get<User>(`${this._urlBase}/GestionUsuarios/getUsersByRole`, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  getMesa(id: number): Observable<Mesa> {
    const headers = this.getHeader();
    return this._http.get<Mesa>(`${this._urlBase}/mesas/${id}`, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  addMesa(mesa: Mesa): Observable<Mesa> {
    const headers = this.getHeader();
    return this._http.post<Mesa>(`${this._urlBase}/mesas`, mesa, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  updateMesa(id: number, mesa: Mesa): Observable<Mesa> {
    const headers = this.getHeader();
    return this._http.put<Mesa>(`${this._urlBase}/mesas/${id}`, mesa, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  deleteMesa(id: number): Observable<void> {
    const headers = this.getHeader();
    return this._http.delete<void>(`${this._urlBase}/mesas/${id}`, { headers }).pipe(
      catchError(this.handleError)
    );
  }


  //PEDIDOS

  getPedidos(): Observable<any[]> {
    const headers = this.getHeader();
    return this._http.get<any[]>(`${this._urlBase}/getPedidos`, { headers }).pipe(
      catchError(this.handleError)
    );
  }


  getPedido(id: number): Observable<Pedido> {
    const headers = this.getHeader();
    return this._http.get<Pedido>(`${this._urlBase}/pedidos/${id}`, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  addPedido(pedido: Pedido): Observable<Pedido> {
    const headers = this.getHeader();
    return this._http.post<Pedido>(`${this._urlBase}/pedidos`, pedido, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  updatePedido(id: number, pedido: Pedido): Observable<Pedido> {
    const headers = this.getHeader();
    return this._http.put<Pedido>(`${this._urlBase}/pedidos/${id}`, pedido, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  deletePedido(id: number): Observable<void> {
    const headers = this.getHeader();
    return this._http.delete<void>(`${this._urlBase}/pedidos/${id}`, { headers }).pipe(
      catchError(this.handleError)
    );
  }


  //PLATOS

  getPlatos(): Observable<Plato[]> {
    const headers = this.getHeader();
    return this._http.get<Plato[]>(`${this._urlBase}/platos`, { headers, responseType: 'json' }).pipe(
      catchError(this.handleError)
    );
  }


  // Obtener un plato por ID
  getPlato(id: number): Observable<Plato> {
    const headers = this.getHeader();
    return this._http.get<Plato>(`${this._urlBase}/platos/${id}`, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Agregar un nuevo plato
  addPlato(plato: Plato): Observable<Plato> {
    const headers = this.getHeader();
    return this._http.post<Plato>(`${this._urlBase}/platos`, plato, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Actualizar un plato existente
  updatePlato(id: number, plato: Plato): Observable<Plato> {
    const headers = this.getHeader();
    return this._http.put<Plato>(`${this._urlBase}/platos/${id}`, plato, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // Eliminar un plato existente
  deletePlato(id: number): Observable<void> {
    const headers = this.getHeader();
    return this._http.delete<void>(`${this._urlBase}/platos/${id}`, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  // PROMOCIONES

  getPromociones(): Observable<Promocion[]> {
    const headers = this.getHeader();
    return this._http.get<Promocion[]>(`${this._urlBase}/promociones`, { headers, responseType: 'json' }).pipe(
      catchError(this.handleError)
    );
  }

  getPromocion(id: number): Observable<Promocion> {
    const headers = this.getHeader();
    return this._http.get<Promocion>(`${this._urlBase}/promociones/${id}`, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  addPromocion(promocion: Promocion): Observable<Promocion> {
    const headers = this.getHeader();
    return this._http.post<Promocion>(`${this._urlBase}/promociones`, promocion, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  updatePromocion(id: number, promocion: Promocion): Observable<Promocion> {
    const headers = this.getHeader();
    return this._http.put<Promocion>(`${this._urlBase}/promociones/${id}`, promocion, { headers }).pipe(
      catchError(this.handleError)
    );
  }

  deletePromocion(id: number): Observable<void> {
    const headers = this.getHeader();
    return this._http.delete<void>(`${this._urlBase}/promociones/${id}`, { headers }).pipe(
      catchError(this.handleError)
    );
  }


  



  
}
