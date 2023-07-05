import { Component, OnInit } from '@angular/core';
import { GestorService } from 'src/app/services/gestor.service';
import { AddMesa } from '../../models/restaurant/Mesa';
import { format } from 'date-fns';
import { User } from '../../models/auth.model';


@Component({
  selector: 'app-add-mesa',
  templateUrl: './add-mesa.component.html',
  styleUrls: ['./add-mesa.component.css']
})
export class AddMesaComponent implements OnInit {
  
  public formChanged: boolean = false; // variable que indica si el formulario ha cambiado o no
  fechaHoy: string;
  isLoading: boolean = false;
  snackBar: any;

  mozoSeleccionado: number | undefined;


  constructor(private _gestorService: GestorService) {
    const today = new Date();
    this.fechaHoy = today.toISOString().split('T')[0];
  }

  user: User | undefined

  mozos: User[] = [];

  ngOnInit(): void {
    this.getUser();

  }

  getUser() {
    this.isLoading = true;
    this._gestorService.getMesaUser().subscribe(
      data => {
        this.user = data;
        this.nuevaMesa.creadoPor = this.user.id;
        this.nuevaMesa.creador = this.user.firstName + ' ' + this.user.lastName;
        this.nuevaMesa.modificadoPor = this.user.id;
        this.nuevaMesa.modificadoEl = new Date();
        this.nuevaMesa.idUsuario = this.user.id;
        this.nuevaMesa.modificador = this.user.firstName + this.user.lastName;
        this.isLoading = false;

        this.getUserByRole();

      }, error => {
        this.isLoading = false;
        this.snackBar.open('Ocurrio un error al obtener el usuario', 'Cerrar', { duration: 5000 });
      }

    )
  }

  getUserByRole() {
    this._gestorService.getMesaMozo().subscribe(
      data => {
        this.mozos = [data];


      }, error => {


      }

    )
  }



  navigateBack(): void {
    this._gestorService.navigateTo('home/mesas');
  }

  nuevaMesa: AddMesa = {
    id: null,
    numero: null,
    capacidad: null,
    estado: null,
    creadoEl: new Date(),
    creadoPor: null,
    modificadoEl: null,
    modificadoPor: null,
    idUsuario: null,
    idMozo: null,
    creador: null,
    modificador: null,
    mozoEncargado: null
  }

  onFormChange() {
    if (this.nuevaMesa.numero === null || this.nuevaMesa.capacidad === null) {
      this.formChanged = false;
    } else {
      this.formChanged = true; // actualiza la variable a true cada vez que se modifica un campo del formulario

    }
  }

  onMozoSelected(id: number) {
    const selectedMozo = this.mozos.find(mozo => mozo.id === id);
    if (selectedMozo) {
      // Realiza las operaciones necesarias con el mozo seleccionado
      this.nuevaMesa.idMozo = id;
      this.nuevaMesa.mozoEncargado = selectedMozo.firstName + ' ' + selectedMozo.lastName;
    } else {
      // El mozo no se encontró en el array de mozos
      console.log('Mozo no encontrado');
    }

  }

  crearMozo() {
    // Lógica para crear un nuevo mozo
    console.log('Crear nuevo mozo');
  }


  crearMesa() {

  }


  estados: string[] = ['Sin definir','Disponible'];






}
