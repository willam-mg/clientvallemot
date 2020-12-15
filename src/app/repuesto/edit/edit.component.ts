import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Repuesto } from 'src/app/models/repuesto';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { NavigationService } from 'src/app/shared/services/navigation.service';
import { RepuestoService } from '../repuesto.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  model: Repuesto;
  id: any;
  submitted: boolean;
  formModel: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private modelService: RepuestoService,
    private router: Router,
    public dialog: MatDialog,
    private title: Title,
    private navigationService: NavigationService) {
    this.navigationService.setBack('/repuestos');
  }

  ngOnInit() {
    this.model = new Repuesto();
    this.route.queryParams.subscribe(params => {
      this.id = params.id;
      if (!this.id) {
        this.router.navigate(['/mecanicos']);
      }
    });
    this.title.setTitle('Repuesto ' + this. id);
    this.formModel = new FormGroup({
      nombre: new FormControl(this.model.nombre, [
        Validators.required,
        Validators.maxLength(50)
      ]),
      precio: new FormControl(this.model.precio, [
        Validators.required,
      ]),
      cantidad: new FormControl(this.model.cantidad),
      medida: new FormControl(this.model.medida, [
        Validators.maxLength(50)
      ]),
    });
    this.loadData();
  }

  loadData() {
    this.modelService.show(this.id).subscribe(data => {
      this.model = data;
      this.formModel.setValue({
        nombre: this.model.nombre,
        precio: this.model.precio,
        cantidad: this.model.cantidad,
        medida: this.model.medida,
      });
    });
  }

  onSubmit() {
    this.dialog.open(AlertComponent, {
      width: '250px',
      data: {
        confirm: true,
        message: 'Modificar registro ?',
        title: '',
      }
    }).afterClosed().subscribe(res => {
      if (res) {
        try {
          if (this.formModel.invalid) {
            throw new Error('Entrada de datos invalido');
          }
          this.submitted = true;

          this.modelService.update(this.model.id, this.formModel.value).subscribe(async data => {
            this.model = data;
            this.modelService.all(null, true).subscribe(() => {
              this.submitted = false;
              this.router.navigate(['/repuestos']);
            });
          }, () => {
            this.submitted = false;
          });
        } catch (error) {
          console.log(error);
        }
      }
    });
  }

}
