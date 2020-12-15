import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { DetalleRepuesto } from 'src/app/models/detalle-repuesto';
import { Orden } from 'src/app/models/orden';
import { Repuesto } from 'src/app/models/repuesto';
import { User } from 'src/app/models/user';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
// import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { OrdenService } from '../orden.service';

@Component({
  selector: 'app-detalle-repuesto',
  templateUrl: './detalle-repuesto.component.html',
  styleUrls: ['./detalle-repuesto.component.css']
})
export class DetalleRepuestoComponent implements OnInit {
  model: Orden;
  submitted: boolean;
  descripcion: string;
  precio: number;
  userData: User;
  isUpdate: boolean;
  id: number;

  constructor(
    private modelService: OrdenService,
    public dialogRef: MatDialogRef<DetalleRepuestoComponent>,
    public dialog: MatDialog,
    public dataService: DataService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.model = data.model;
    this.userData = data.userData;
    this.isUpdate = data.isUpdate;
    if (data.repuesto) {
      this.id = data.repuesto.id;
      this.descripcion = data.repuesto.repuesto;
      this.precio = data.repuesto.precio;
    }
  }


  closeDialog(reload = false) {
    this.dialogRef.close(reload);
  }

  ngOnInit() {
  }

  onSubmit() {
    try {
      if (this.descripcion === '') {
        throw new Error('Entrada de datos invalido');
      }
      this.submitted = true;
      const sendBody = {
        orden_id: this.model.id,
        repuesto: this.descripcion,
        precio: this.precio,
      };
      this.modelService.addRepuesto(sendBody).subscribe(async () => {
        this.modelService.all(null, true).subscribe(() => {
          this.submitted = false;
          this.closeDialog(true);
        });
      }, () => {
        this.submitted = false;
      });
    } catch (error) {
      console.log(error);
    }
  }

  onUpdate() {
    try {
      if (this.descripcion === '') {
        throw new Error('Entrada de datos invalido');
      }
      this.submitted = true;
      const sendBody = {
        orden_id: this.model.id,
        repuesto: this.descripcion,
        precio: this.precio,
      };
      this.modelService.editRepuesto(this.id, sendBody).subscribe(async () => {
        this.modelService.all(null, true).subscribe(() => {
          this.submitted = false;
          this.closeDialog(true);
        });
      }, () => {
        this.submitted = false;
      });
    } catch (error) {
      console.log(error);
    }
  }

  onDelete() {
    this.dialog.open(AlertComponent, {
      width: '250px',
      data: {
        confirm: true,
        message: 'Esta seguro de eliminar este registro ?',
        title: 'eliminar',
      }
    }).afterClosed().subscribe(res => {
      if (res) {
        this.modelService.deleteRepuesto(this.id).subscribe(data => {
          this.submitted = false;
          this.closeDialog(true);

        });
      }
    });
  }

}
