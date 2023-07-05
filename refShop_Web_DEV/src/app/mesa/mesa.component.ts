import { Component, OnInit } from '@angular/core';
import { Mesa } from '../models/restaurant/Mesa';
import { GestorService } from '../services/gestor.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../models/auth.model';


@Component({
  selector: 'app-mesa',
  templateUrl: './mesa.component.html',
  styleUrls: ['./mesa.component.css']
})
export class MesaComponent implements OnInit {

  showTooltip: boolean = false;
  isLoading: boolean = false;
  mesas: Mesa[] = [];
  currentPage: number = 1;
  pageSize: number = 10;


  constructor(private _gestorService: GestorService,
    private snackBar: MatSnackBar,
  ) { }


  ngOnInit(): void {
    this.getMesas();
  }

  getPopover(show: boolean) {
    this.showTooltip = show;
    console.log(this.showTooltip);
  }

  getMesas() {
    this.isLoading = true;
    this._gestorService.getMesas(this.currentPage, this.pageSize).subscribe(
      data => {
        this.mesas = data;
        this.isLoading = false;
      }, error => {
        this.isLoading = false;
        this.snackBar.open('Ocurrió un error al intentar obtener las mesas', 'Cerrar', { duration: 5000 });
      }

    )
  }

  previousPage() {
    if (this.currentPage >= 2) { // Verificar si currentPage es mayor o igual a 2
      this.currentPage--;
      this.getMesas();
    }
  }

  nextPage() {
    this.currentPage++;
    this.getMesas();
  }


  getEstadoClass(estado: string): string {
    if (estado === 'Disponible') {
      return 'libre-class';
    } else if (estado === 'Ocupado') {
      return 'ocupado-class';
    } else if (estado === 'Reservado') {
      return 'reservado-class';
    }
    return '';
  }

  getIconClass(estado: string): string {
    if (estado === 'Disponible') {
      return 'libre-icon';
    } else if (estado === 'Ocupado') {
      return 'ocupado-icon';
    } else if (estado === 'Reservado') {
      return 'reservado-icon';
    }
    return '';
  }

  agregarMesa() {
    this._gestorService.navigateTo('/home/mesas/AgregarMesa');
  }

 
}
