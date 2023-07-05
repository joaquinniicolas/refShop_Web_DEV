import { Component, OnInit } from '@angular/core';
import { AddCategoria} from 'src/app/models/restaurant/Categoria';
import { GestorService } from 'src/app/services/gestor.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-add-categoria',
  templateUrl: './add-categoria.component.html',
  styleUrls: ['./add-categoria.component.css']
})
export class AddCategoriaComponent implements OnInit {

  constructor(private _gestorService: GestorService, private _snackBar: MatSnackBar, private router: Router, private location: Location) {  }

  ngOnInit(): void {
  }

  navigateBack(): void {
    this.location.back();
  }

  nuevaCategoria: AddCategoria = {
    id: 0,
    nombre: '',
    descripcion: '',
    creado_el: new Date(),
    creado_por: 0,
    mostrar_en_sitio: 0,
    idUsuarioNavigation: undefined
  };

  crearCategoria() {
    if (this.nuevaCategoria.mostrar_en_sitio) {
      this.nuevaCategoria.mostrar_en_sitio = 1;
    } else {
      this.nuevaCategoria.mostrar_en_sitio = 0;
    }

    this._gestorService.addCategoria(this.nuevaCategoria).subscribe(
      (nuevaCategoria) => {
        const categoria: AddCategoria = {
            id: nuevaCategoria.id,
            nombre: nuevaCategoria.nombre,
          descripcion: nuevaCategoria.descripcion,
          creado_el: nuevaCategoria.creado_el,
          creado_por: nuevaCategoria.creado_por,
          mostrar_en_sitio: nuevaCategoria.mostrar_en_sitio,
          idUsuarioNavigation: undefined
        };
        this.nuevaCategoria = {
          nombre: '',
          descripcion: '',
          creado_el: new Date(),
          creado_por: 0,
          mostrar_en_sitio: 0,
          idUsuarioNavigation: undefined
        };
        this._snackBar.open('La categoría se creó correctamente', 'Cerrar', {
          duration: 5000,
          
        });
        
        this._gestorService.navigateTo("home/categorias");
      },
      (error) => {
        console.error(error)
        this._snackBar.open('Ocurrió un error al crear la categoría' + error, 'Cerrar', {
          duration: 5000,
        });
      }

    );
  }

}
