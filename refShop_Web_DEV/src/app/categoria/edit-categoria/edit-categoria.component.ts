import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GestorService } from 'src/app/services/gestor.service';
import { AddCategoria, Categoria } from 'src/app/models/restaurant/Categoria';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-categoria',
  templateUrl: './edit-categoria.component.html',
  styleUrls: ['./edit-categoria.component.css']
})
export class EditCategoriaComponent implements OnInit {
 
  public isLoading: boolean = false;
  updateCategoria: AddCategoria | undefined;

  public formChanged: boolean = false; // variable que indica si el formulario ha cambiado o no

  categoria: Categoria = {
    nombre: '',
    descripcion: '',
    creadoEl: new Date(),
    creadoPor: 0,
    mostrarEnSitio: 0,
    usuarioNombre: '',
    usuarioApellido: ''
  }
  public categoriaActual: string = '';



  
  constructor(private route: ActivatedRoute,
    private gestorService: GestorService,
    private location: Location,
    private _snackBar: MatSnackBar
  ) {
  }

  

  ngOnInit(): void {
    this.isLoading = true;

    const id = this.route.snapshot.paramMap.get('id'); // Obtener el id de la categoría de la URL

    if (id) {
      this.gestorService.getCategoria(parseInt(id)).subscribe(
        categoria => {
          this.categoria = categoria;
          this.isLoading = false;
          this._snackBar.open('Acción completada con exito', 'Cerrar', {
            duration: 1000,

          });
          this.categoriaActual = this.categoria.nombre
        },
        error => {
          console.log(error);
        }
      );

    }
  }

  onFormChange() {
    if (this.categoria.nombre === '' || this.categoria.descripcion === '') {
      this.formChanged = false;
    } else {
      this.formChanged = true; // actualiza la variable a true cada vez que se modifica un campo del formulario

    }
  }

  onSubmit() {
    // Actualizar la categoría
    this.isLoading = true;
    const id = this.route.snapshot.paramMap.get('id'); // Obtener el id de la categoría de la URL

    if (this.categoria.nombre === '' && this.categoria.nombre === '') {
      this._snackBar.open('Algunos datos no fueron cargados correctamente', 'Cerrar', {
        duration: 1000,

      });
      this.isLoading = false;

    } else {

      const categoria: AddCategoria = {
        nombre: this.categoria.nombre,
        descripcion: this.categoria.descripcion,
        creado_el: new Date(),
        creado_por: this.categoria.creadoPor,        
        mostrar_en_sitio: this.categoria.mostrarEnSitio ? 1 : 0
      };
      if (id) {

        this.gestorService.updateCategoria(parseInt(id), categoria).subscribe(
          response => {
            this.updateCategoria = response;
            this._snackBar.open('La categoría se actualizó correctamente', 'Cerrar', {
              duration: 1000,

            });
            this.isLoading = false;
            this.gestorService.filaEditada = this.categoria.id;
            this.gestorService.navigateTo("home/categorias");
          },
          error => {
            this._snackBar.open('Hubo un inconvenite al actualizar la categoria', 'Cerrar', {
              duration: 1000,

            });
            this.isLoading = false;
          }
        );

      }

    }
       
  }
  navigateBack(): void {
    this.location.back();
  }


}

