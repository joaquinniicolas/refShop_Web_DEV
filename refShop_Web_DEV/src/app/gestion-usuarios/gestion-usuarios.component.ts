import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../models/auth.model';
import { Roles } from '../models/Roles';
import { GestorService } from '../services/gestor.service';
import { Permissions} from '../models/Permissions';
import { RolePermission } from '../models/RolePermission';
@Component({
  selector: 'app-gestion-usuarios',
  templateUrl: './gestion-usuarios.component.html',
  styleUrls: ['./gestion-usuarios.component.css']
})
export class GestionUsuariosComponent implements OnInit {

  usuarios: User[] = [];
  usuarioSeleccionado: User | undefined;
  modoEdicion: boolean = false;
  mensajeError: string | undefined;
  isLoading: boolean = false;
  userColumns: string[] = ['firstName', 'lastName', 'email'];
  mostrarGrilla: boolean = false; // Propiedad para controlar la vista de grilla o tarjetas
  columnas: string[] = ['id', 'username', 'email', 'firstName', 'lastName','userRoleId','photoPath','createdAt','updatedAt'];
  roles: Roles[] = [];
  selectedRole: Roles | null = null;
  permissions: Permissions[] = [];
  selectedUserId: number | null = null;
  rolePermission: RolePermission[] = [];
  filteredPermissions: Permissions[] = [];
  showingRoles: boolean = false;
  showingPermisos: boolean = false;
  selectedFilterOption: string = '';
  selectedPermission: Permissions | null = null;
  stringSelectedRole: string = '';

  constructor(private _gestorService: GestorService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this._gestorService.getUsers().subscribe(
      data => {
        this.usuarios = data;
        this.isLoading = false;
      }, error => {
        this.isLoading = false;
        this.snackBar.open('Ocurrió un error al intentar obtener los usuarios', 'Cerrar', { duration: 5000 });
      }

    )

    this._gestorService.getRoles().subscribe(
      data => {
        this.roles = data
      }, error => {
        this.snackBar.open('Ocurrió un error al intentar obtener los roles de el usuario', 'Cerrar', { duration: 5000 });

      }
    )

    this._gestorService.getPermissions().subscribe(
      data =>{
        this.permissions = data
      }, error =>{
        this.snackBar.open('Ocurrió un error al intentar obtener los permisos de el usuario', 'Cerrar', { duration: 5000 });

      }

    )

    this._gestorService.getRolesPermission().subscribe(
      data =>{
        this.rolePermission = data
      }, error =>{
        this.snackBar.open('Ocurrió un error al intentar obtener la relación entre los permisos y los roles', 'Cerrar', { duration: 5000 });

      }
    )

    this.selectRole(null);
    this.showingRoles = true;
    this.selectedFilterOption = "nada";
    this.filterPermissions("nada");
  }

  getRoleName(roleId: number): string {
    const role = this.roles.find((r) => r.id === roleId);
    return role ? role.name : 'Sin definir';
  }


  getColumnLabel(columna: string): string {
    switch (columna) {
      case 'id':
        return 'Id';
      case 'username':
        return 'Nombre de usuario';
      case 'email':
        return 'Email';
      case 'firstName':
        return 'Nombre';
      case 'lastName':
        return 'Apellido';
      case 'userRoleId':
        return 'Rol de el usuario';
      case 'phone':
        return 'Telefono';
      case 'photoPath':
        return 'Foto de perfil';
      case 'createdAt':
        return 'Fecha de creación';
      case 'updatedAt':
        return 'Ultima actualización';
      default:
        return columna;
    }
  }

  addUsuario() {
    this._gestorService.navigateTo("home/usuarios/add");
  }

  editUsuario() {
    this._gestorService.navigateTo("home/usuarios/edit");
  }


  selectUser(userId: number): void {
    if (this.selectedUserId === userId) {
      // Si el usuario ya está seleccionado, deseleccionarlo
      this.selectedUserId = null;
    } else {
      // Seleccionar el usuario
      this.selectedUserId = userId;
    }
  }

  //FILTRO
  filtro: string = '';
  usuariosFiltrados: User[] = [];

  filtrarUsuarios() {
    this.usuariosFiltrados = this.usuarios.filter(user =>
      user.userName.toLowerCase().includes(this.filtro.toLowerCase()) ||
      user.userRoleId.toString().includes(this.filtro.toLowerCase()) ||
      (user.phone && user.phone.toLowerCase().includes(this.filtro.toLowerCase())) ||
      user.firstName.toLowerCase().includes(this.filtro.toLowerCase()) ||
      user.lastName.toLowerCase().includes(this.filtro.toLowerCase())
    );
  }


  limpiarFiltro() {
    this.filtro = '';
    this.filtrarUsuarios();
  }

  selectRole(role: Roles | null) {
    if (this.selectedRole === role) {
   
      this.selectedRole = null;
      this.filteredPermissions = this.permissions; // Mostrar todos los permisos si no hay un rol seleccionado
    } else {
      this.selectedRole = role;
      if (role !== null) {
        const roleId = role.id;
        const permissionIds = this.rolePermission
          .filter(rp => rp.roleId === roleId)
          .map(rp => rp.permissionId);
  
        const filteredPermissions = this.permissions.filter(permission => permissionIds.includes(permission.id));
  
        this.filteredPermissions = filteredPermissions;
      } else {
        this.filteredPermissions = this.permissions; // Mostrar todos los permisos si se selecciona "null" (ningún rol)
      }
    }
    // Realiza la lógica adicional que desees al seleccionar un rol
  }





  showRoles() {
    this.showingRoles = true;
    this.showingPermisos = false;
  }

  showPermisos() {
    this.showingRoles = false;
    this.showingPermisos = true;
  }
  
  
  filterPermissions(option: string) {
    if (option === 'nada') {

      // Si la opción seleccionada es "Nada", mostrar todos los permisos sin filtrar
      this.filteredPermissions = this.permissions;
    } else if(option === 'roles'){
      this.selectedFilterOption = 'roles';
    // Lógica para filtrar por roles
    if (this.stringSelectedRole !== null) {
      const selectedRoleName = this.stringSelectedRole;
      const selectNewRole = this.roles.find(role => role.name === selectedRoleName);

      
      if (selectNewRole) {
        this.selectRole(selectNewRole);
      }
    }
    }else if(option === 'permisos'){
      //LOGICA PARA FILTRAR POR NOMBRE
    }
  }

  countPermissions(roleId: number): number {
    return this.rolePermission.filter(rp => rp.roleId === roleId).length;
  }
  
  countUsers(roleId: number): number {
    return this.usuarios.filter(user => user.userRoleId === roleId).length;
  }


}
