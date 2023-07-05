import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GestorService } from '../../services/gestor.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RegisterDto } from '../../models/RegisterUser';
import { Roles } from '../../models/Roles';
@Component({
  selector: 'app-add-usuario',
  templateUrl: './add-usuario.component.html',
  styleUrls: ['./add-usuario.component.css']
})
export class AddUsuarioComponent implements OnInit {

  userForm!: FormGroup;
  photoFile: File | null = null; // Variable para almacenar la foto
  photoPath: string | null = null; // Variable para almacenar la ruta de la foto
  roles: Roles[] = [];
  nombreUsuarioDisponible: boolean | undefined;

  constructor(private _gestorService: GestorService, private formBuilder: FormBuilder,
    private _matSnack: MatSnackBar
  ) {
    this.userForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.maxLength(20)]],
      lastName: ['', [Validators.required, Validators.maxLength(20)]],
      userName: ['', [Validators.required, Validators.maxLength(12), Validators.minLength(5)]],
      email: ['', [Validators.required, Validators.email]],
      passwordHash: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      phone: ['', [Validators.pattern('[0-9]*'), Validators.required]],
      roleId: [null, Validators.required], // Actualiza el nombre del control a 'roleId' y agrega las validaciones necesarias
      updatedAt: [new Date()],
      photoPath: [null] // Agrega el control 'photoPath' con un valor inicial de null
    });

  }

  ngOnInit(): void {
    this.onRoleListOpened();
  }

  createUser() {
    if (this.userForm.invalid) {
      return;
    }
    const registerDto: RegisterDto = {
      firstName: this.userForm.value.firstName,
      lastName: this.userForm.value.lastName,
      userName: this.userForm.value.userName,
      email: this.userForm.value.email,
      passwordHash: this.userForm.value.passwordHash,
      confirmPassword: this.userForm.value.passwordHash,
      phone: this.userForm.value.phone,
      roleId: this.userForm.value.roleId,
      updatedAt: this.userForm.value.updatedAt
    };


    if (this.photoFile) {

      this._gestorService.uploadPhoto(registerDto.userName, this.photoFile).subscribe(
        (response: any) => {
          if (response.photoUrl) {
            this.photoPath = response.photoUrl; // Asignar la URL directamente desde la propiedad photoUrl

            


            this._matSnack.open('Foto de perfil cargada con éxito', 'Cerrar', { duration: 2000 });

            this._gestorService.registerUser(registerDto, response.photoUrl).subscribe(
              (response: RegisterDto) => {

                this._matSnack.open('El usuario se ha creado exitosamente', 'Cerrar', { duration: 5000 });
                this._gestorService.navigateTo("home/usuarios");
              },
              (error) => {
                this._matSnack.open('Ocurrió un problema al crear el usuario', 'Cerrar', { duration: 5000 });
              }
            )

          } else {
            console.error('La respuesta no tiene la propiedad photoUrl:', response);
            this._matSnack.open('No se pudo cargar la foto de perfil', 'Cerrar', { duration: 2000 });
          }
        },
        (error) => {
          console.error(error);
          this._matSnack.open('No se pudo cargar la foto de perfil', 'Cerrar', { duration: 2000 });
        }
      );








      
      
    } else {
      this._gestorService.registerUser(registerDto, "Sin definir").subscribe(
        (response: RegisterDto) => {

          this._matSnack.open('El usuario se ha creado exitosamente', 'Cerrar', { duration: 5000 });
          this._gestorService.navigateTo("home/usuarios");
        },
        (error) => {
          this._matSnack.open('Ocurrió un problema al crear el usuario', 'Cerrar', { duration: 5000 });
        }
      )

    }
  }


  handlePhotoUpload(event: Event) {
    const inputElement = event.target as HTMLInputElement;

    if (inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif']; // Tipos de archivo permitidos
      const maxSizeInBytes = 5242880; // Tamaño máximo de archivo en bytes (5 MB)

      if (allowedTypes.includes(file.type) && file.size <= maxSizeInBytes) {
        const reader = new FileReader();
        reader.onload = () => {
          const imageUrl = reader.result as string;
          this.userForm.get('photoPath')?.setValue(imageUrl); // Actualizar el valor de photoPath en el formulario
          this.photoFile = file;
          console.log(this.photoFile);
        };
        reader.readAsDataURL(file);
      } else {
        // Tipo de archivo no válido o tamaño excedido, realizar acciones necesarias (mostrar mensaje de error, restablecer campo, etc.)
        this._matSnack.open('El tamaño de la foto supera los 5 MB o el tipo de archivo no es el correcto', 'Cerrar', { duration: 5000 });
        inputElement.value = ''; // Restablecer el valor del campo de entrada de archivos
      }
    }
  }




  generateRandomPassword() {
    const length = 8; // Longitud de la contraseña aleatoria
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'; // Caracteres permitidos
    let randomPassword = '';

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomPassword += characters.charAt(randomIndex);
    }

    const passwordHashControl = this.userForm.get('passwordHash');
    const confirmPasswordControl = this.userForm.get('confirmPassword');

    if (passwordHashControl && confirmPasswordControl) {
      passwordHashControl.setValue(randomPassword);
      confirmPasswordControl.setValue(randomPassword);
    }
  }

  isRolesLoaded: boolean = false;

  onRoleListOpened() {
    this.isRolesLoaded = true;
    this._gestorService.getRoles().subscribe(
      (roles: Roles[]) => {
        this.roles = roles;
      },
      (error) => {
        this._matSnack.open('Ocurrió un error al obtener los roles. Por defecto se asignará el rol de Mozo', 'Cerrar', { duration: 5000 });
      }
  )}

  onRoleSelected(event: any) {
    const selectedRoleName = event.value;
    
    this.userForm.get('roleId')?.setValue(selectedRoleName);
  }

  check(userName: string) {
    if (userName && userName.trim() !== '' && userName.length > 5 && userName.length <= 12) {
      this._gestorService.checkUserName(userName).subscribe(
        (isAvailable: boolean) => {
          if (isAvailable) {
            // Nombre de usuario disponible
            // Actualiza el estado o la variable para mostrar el mensaje de éxito
            this.nombreUsuarioDisponible = isAvailable;
          } else {
            // No se puede utilizar este nombre de usuario
            // Actualiza el estado o la variable para mostrar el mensaje de error
            this.nombreUsuarioDisponible = isAvailable;
          }
        },
        (error) => {
          this._matSnack.open('Ocurrió un error al verificar el nombre, por favor intenta mas tarde.', 'Cerrar', { duration: 5000 });
        }
      )
    } else {
      this.nombreUsuarioDisponible = undefined;
    }
    
  }


  editPhoto() {

  }

  deletePhoto() {

  }

  truncateValue(value: string | undefined): string {
    if (value && value.length > 15) {
      return value.substring(0, 15) + '...';
    }
    return value || '';
  }

  navigateBack() {
    this._gestorService.navigateTo("home/usuarios");
  }

}
