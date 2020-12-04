import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Accesorio } from 'src/app/models/accesorio';
import { AlertComponent } from 'src/app/shared/alert/alert.component';

@Component({
  selector: 'app-accesorios',
  templateUrl: './accesorios.component.html',
  styleUrls: ['./accesorios.component.css']
})
export class AccesoriosComponent implements OnInit {
  accesorios: Array<Accesorio>;

  constructor(
    public dialogRef: MatDialogRef<AlertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.accesorios = data.accesorios;
  }

  ngOnInit() {
  }

  closeDialog(estadoVehiculoSeleccionado) {
    const optionsSelected = estadoVehiculoSeleccionado.selectedOptions.selected.map( element => {
      return element.value;
    });
    const options = estadoVehiculoSeleccionado.options.map(element => {
      element.value.checked = optionsSelected.some(option => {
        return option.id === element.value.id;
      });
      return element.value;
    });
    this.dialogRef.close(options);
  }
}
