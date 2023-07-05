import { Component, OnInit } from '@angular/core';
import { Pedido } from 'src/app/models/restaurant/Pedido';
import { GestorService } from 'src/app/services/gestor.service';
import { Plato } from 'src/app/models/restaurant/Plato';
import { Mesa } from 'src/app/models/restaurant/Mesa';
import { TokenPayload, User } from 'src/app/models/auth.model'
import { AuthService } from '../../auth.service';
import { Categoria } from 'src/app/models/restaurant/Categoria';


@Component({
  selector: 'app-agregar-pedido-component',
  templateUrl: './agregar-pedido-component.component.html',
  styleUrls: ['./agregar-pedido-component.component.css']
})
export class AgregarPedidoComponentComponent implements OnInit {


  constructor(private gestorService: GestorService,
    private authService: AuthService) { }

  platos: Plato[] | undefined;
  categorias: Categoria[] | undefined;
  mesas: Mesa[] | undefined;
  user?: User;


  nuevoPedido: Pedido = {
    id: 0,
    idPlato: 0,
    idMesa: 0,
    idUsuario: 0,
    observaciones: '',
    fechaPedido: new Date(),
    estadoPedido: '',
    total: 0,
    idPlatoNavigation: null as unknown as Plato,
    idMesaNavigation: null as unknown as Mesa,
    idUsuarioNavigation: null as unknown as User
  };



  ngOnInit(): void {
    //this.gestorService.getPlatos().subscribe((platos: Plato[]) => {
    //  this.platos = platos;
    //});
    //this.gestorService.getCategorias().subscribe((categorias: Categoria[]) => {
    //  this.categorias = categorias;
    //});
    //this.user = this.authService.currentUser ?? undefined;

    //this.gestorService.getMesas().subscribe((mesas: Mesa[]) => {
    //  this.mesas = mesas;
    //});
  }

  agregarPedido(): void {
    this.nuevoPedido.idUsuario = this.user?.id || 0;

    this.gestorService.getPlato(this.nuevoPedido.idPlato)
      .subscribe((plato: Plato) => {
        this.nuevoPedido.idPlatoNavigation = plato;
        this.gestorService.addPedido(this.nuevoPedido)
          .subscribe(pedido => {
            console.log(`Pedido agregado con ID: ${pedido.id}`);
          });
      });
  }

}


