import { Categoria } from "./Categoria";
import { Promocion } from "./Promocion";

export interface Plato {
  id: number;
  nombre: string;
  descripcion: string;
  idCategoria: number;
  idPromocion: number;
  precio: number;
  activo: number;
  imagen: string;
  idCategoriaNavigation: Categoria;
  idPromocionNavigation: Promocion;
}
