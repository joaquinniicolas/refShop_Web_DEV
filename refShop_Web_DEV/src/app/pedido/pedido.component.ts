import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Pedido } from '../models/restaurant/Pedido';
import { GestorService } from '../services/gestor.service';
import { AgregarPedidoComponentComponent } from './agregar-pedido-component/agregar-pedido-component.component';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styleUrls: ['./pedido.component.css']
})
export class PedidoComponent implements OnInit {
  pedidos!: Pedido[] | [];
  displayedColumns: string[] = ['id', 'idPlato', 'idMesa', 'observaciones', 'fechaPedido', 'estadoPedido', 'total', 'actions'];
  pendientes: number = 0;
  public cargando: boolean = true;
  public error: any = '';


  constructor(
    private _gestorService: GestorService,
    public dialog: MatDialog,    
  ) {

  }

  ngOnInit(): void {

    this._gestorService.getPedidos().subscribe(

      (pedidos) => {
        this.pedidos = pedidos;
        this.pendientes = this.pedidos.filter(
          (pedido) => pedido.estadoPedido === 'Pendiente'
        ).length;
         // Carga completa
      },
      (error) => {
        this._gestorService.handleError(error).subscribe((errorMsg) => {
          this.error = this._gestorService.handleError(error); // Asignamos el mensaje de error devuelto por el método handleError a la variable error
        });
        this.cargando = false;
      }
    );
    this.cargando = false;
    
  }

  getPedidos(): number {
    return this.pedidos.filter(pedido => pedido.estadoPedido === 'Pendiente').length;

  }


  openAgregarPedidoDialog() {
    const dialogRef = this.dialog.open(AgregarPedidoComponentComponent, {
      width: '250px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.getPedidos();
    });
  }

  getPedidosCompletados(): number {
    return this.pedidos.filter(pedido => pedido.estadoPedido === 'Completado').length;
  }



}


