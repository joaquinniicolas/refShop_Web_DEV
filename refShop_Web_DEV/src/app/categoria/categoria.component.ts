import { Component, OnInit } from '@angular/core';
import { Categoria } from 'src/app/models/restaurant/Categoria';
import { GestorService } from 'src/app/services/gestor.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { PopupComponent } from 'src/app/categoria/DeletePopup/PopupComponent';
import { MatDialog } from '@angular/material/dialog';

// ...



@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})

export class CategoriaComponent implements OnInit {


  constructor(private _gestorService: GestorService,
    private snackBar: MatSnackBar,
    private router: Router,
    private _router: ActivatedRoute,
    private dialog: MatDialog

  ) { }

  centrarFormulario = false;
  public isLoading: boolean = false;



  categorias: Categoria[] = [];
  public filaSeleccionada: Categoria | undefined;



  // Variable para mostrar/ocultar el formulario de creación de categoría

  // Función para mostrar el formulario de creación de categoría
  agregarCategoria() {
    this.router.navigate(['/home/categorias/crearCategoria']);

  }


  seleccionarFila(categoria: Categoria) {
    if (this.filaSeleccionada === categoria) {
      this.filaSeleccionada = undefined;
      this.disableEdit = true;
      this.disableDelete = true;
    } else {

      this.filaSeleccionada = categoria;
      this.disableEdit = false;
      this.disableDelete = false;
    }
  }



  ngOnInit(): void {
    this.isLoading = true;
    this.getCategorias();
  }



  getCategorias() {
    this._gestorService.getCategorias().subscribe(
      data => {
        console.log(this._gestorService.filaEditada);
        this.categorias = data;
        //this.categorias = this.categorias.map(categoria => {
        //  return {
        //    ...categoria, // Copiar todas las propiedades del objeto 'categoria'
        //    editada: categoria.id === this.categoriaEditadaId // Agregar la propiedad 'editada'
        //  }
        //});

        this.leftItems = this.categorias.map(categoria => categoria.nombre);
        this.isLoading = false;

      },
      error => {
        this.snackBar.open('Ups! Ocurrió un problema al contactar con el servidor', 'Cerrar', {
          duration: 5000
        });
      }
    );

  }

  //ELIMINAR SECTION

  disableDelete: boolean = true;
  
  eliminarCategoria() {
    this.openPopup('¿Estás seguro de que deseas eliminar la categoría?').then(result => {
      if (result) {
        this.isLoading = true;
        if (this.filaSeleccionada?.id) {
          this._gestorService.deleteCategoria(this.filaSeleccionada.id).subscribe(
            () => {
              this.getCategorias();
              this.isLoading = false;
              this.snackBar.open('La categoría se eliminó correctamente.', 'Cerrar', {duration:2000});
            },
            error => {
              console.log(error);
              this.isLoading = false;
              this.snackBar.open('Hubo un error al eliminar la categoría', 'Cerrar', { duration: 2000 });
            }
          );
        } else {
          this.snackBar.open('No ha seleccionado una categoría', 'Cerrar', { duration: 2000 });
        }
      }
    });
    
  }

  openPopup(message: string, buttons: string[] = ['Cancelar', 'Eliminar']): Promise<boolean> {
    const dialogRef = this.dialog.open(PopupComponent, {
      data: { message: message, buttons: buttons },
      disableClose: true
    });

    return dialogRef.afterClosed().toPromise();
  }



  //EDITAR SECTION
  //DISABLE BUTON
  disableEdit: boolean = true;

  editarCategoria() {
    const id = this.filaSeleccionada?.id
    if (id) {
      this.router.navigate(['/home/categorias/editarCategoria', this.filaSeleccionada?.id]);

    }

  }



  //DUAL LIST BOX



  leftItems: string[] = [];
  rightItems: string[] = [];

  leftSelectedItems: string[] = [];
  rightSelectedItems: string[] = [];

  moveRight() {
    this.rightItems.push(...this.leftSelectedItems);
    this.leftItems = this.leftItems.filter(item => !this.leftSelectedItems.includes(item));
    this.leftSelectedItems = [];
  }

  moveLeft() {
    this.leftItems.push(...this.rightSelectedItems);
    this.rightItems = this.rightItems.filter(item => !this.rightSelectedItems.includes(item));
    this.rightSelectedItems = [];
  }





}
