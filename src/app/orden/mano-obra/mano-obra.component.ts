import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DataService } from 'src/app/data.service';
import { LoginService } from 'src/app/login/login.service';
import { Orden } from 'src/app/models/orden';
import { User } from 'src/app/models/user';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { OrdenService } from '../orden.service';

@Component({
  selector: 'app-mano-obra',
  templateUrl: './mano-obra.component.html',
  styleUrls: ['./mano-obra.component.css']
})
export class ManoObraComponent implements OnInit {
  model: Orden;
  submitted: boolean;
  descripcion: string;
  precio: number;
  userData: User;
  isUpdate: boolean;
  id: number;

  constructor(
    private modelService: OrdenService,
    public dialogRef: MatDialogRef<ManoObraComponent>,
    public dialog: MatDialog,
    public dataService: DataService,
    public loginService: LoginService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    this.userData = this.loginService.getUser();
    this.model = data.model;
    this.userData = data.userData;
    this.isUpdate = data.isUpdate;
    if (data.manoObra){
      this.id = data.manoObra.id;
      this.descripcion = data.manoObra.descripcion;
      this.precio = data.manoObra.precio;
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
        descripcion: this.descripcion,
        precio: this.precio,
      };
      this.modelService.addManoObra(sendBody).subscribe(async () => {
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
        descripcion: this.descripcion,
        precio: this.precio,
      };
      this.modelService.editManoObra(this.id, sendBody).subscribe(async () => {
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
        this.modelService.deleteManoObra(this.id).subscribe(data => {
          this.submitted = false;
          this.closeDialog(true);

        });
      }
    });
  }


}
