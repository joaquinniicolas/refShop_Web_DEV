import { User } from "../auth.model";
import { Mesa } from "./Mesa";
import { Plato } from "./Plato";

export interface Pedido {
  id: number;
  idPlato: number;
  idMesa: number;
  idUsuario: number;
  observaciones: string;
  fechaPedido: Date;
  estadoPedido: string;
  total: number;
  idPlatoNavigation: Plato;
  idMesaNavigation: Mesa;
  idUsuarioNavigation: User;
}
