import { User } from "../auth.model";

 
export interface Promocion {
  id: number;
  nombre: string;
  descuento: number;
  fechaInicio: Date;
  fechaFin: Date;
  aplicadoPor: number;
  estado: boolean;
  aplicadoPorNavigation: User;
}
