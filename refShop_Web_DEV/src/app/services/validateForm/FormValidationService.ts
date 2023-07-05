import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormValidationService {

  constructor() { }

  isFormValid(form: FormGroup): boolean {
    if (!form.valid) {
      // recorrer todos los campos para mostrar los errores
      Object.keys(form.controls).forEach(key => {
        const control = form.get(key);
        if (control) {
          control.markAsTouched();
          control.markAsDirty();
        }
        
      });
      return false;
    }
    return true;
  }
}
