import { User } from "../auth.model";


export interface Categoria {
  id?: number;
  nombre: string;
  descripcion: string;
  creadoEl: Date;
  creadoPor: number;
  mostrarEnSitio: number;
  creadoPorNavigation?: User;
  usuarioNombre?: string;
  usuarioApellido?: string;
}

export interface AddCategoria {
  id?: number;
  nombre: string;
  descripcion: string;
  creado_el: Date;
  creado_por: number;
  mostrar_en_sitio: number;
  idUsuarioNavigation?: User;
}


