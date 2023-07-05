import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-popup',
  template: `
    <h1>{{ data.message }}</h1>
    <div class="buttons">
      <button mat-button (click)="onCancelClick()">Cancelar</button>
      <button mat-button color="warn" (click)="onDeleteClick()">Eliminar</button>
    </div>
  `,
  styles: [
    `
      h1 {
        color: #333;
        text-align: center;
      }
      .buttons {
        display: flex;
        justify-content: center;
        margin-top: 16px;
      }
    `
  ]
})

export class PopupComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<PopupComponent>
  ) { }

  onCancelClick(): void {
    this.dialogRef.close(false);
  }

  onDeleteClick(): void {
    this.dialogRef.close(true);
  }
}
