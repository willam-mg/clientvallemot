import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Mecanico } from 'src/app/models/mecanico';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { MecanicoService } from '../mecanico.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  model: Mecanico;
  id: any;
  submitted: boolean;
  formModel: FormGroup;

  constructor(private route: ActivatedRoute,
              private modelService: MecanicoService,
              private router: Router,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    this.model = new Mecanico();
    this.route.queryParams.subscribe(params => {
      this.id = params.id;
      if (!this.id) {
        this.router.navigate(['/mecanicos']);
      }
    });
    this.formModel = new FormGroup({
      nombre_completo: new FormControl(this.model.nombre_completo, [
        Validators.required,
        Validators.maxLength(50)
      ]),
      telefono: new FormControl(this.model.telefono, [
      ]),
      direccion: new FormControl(this.model.direccion, [
        Validators.maxLength(250)
      ]),
      ci: new FormControl(this.model.ci, [
        Validators.required,
      ]),
      email: new FormControl(this.model.email, [
      ]),
      especialidad: new FormControl(this.model.especialidad, [
      ]),
      fecha_ingreso: new FormControl(this.model.fecha_ingreso, [
      ]),
      fecha_salida: new FormControl(this.model.fecha_salida, [
      ]),
      foto: new FormControl(null),
    });
    this.loadData();
  }

  loadData() {
    this.modelService.show(this.id).subscribe(data => {
      this.model = data;
      this.formModel.setValue({
        nombre_completo: this.model.nombre_completo,
        telefono: this.model.telefono,
        direccion: this.model.direccion,
        ci: this.model.ci,
        email: this.model.email,
        especialidad: this.model.especialidad,
        fecha_ingreso: this.model.fecha_ingreso,
        fecha_salida: this.model.fecha_salida,
        foto: this.model.foto,
      });
    });
  }

  onFileChange(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = (e: any) => {
        this.model.foto = e.target.result;
        this.formModel.patchValue({
          foto: reader.result
        });
      };
    }
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
              this.router.navigate(['/mecanicos/show'], {
                queryParams:
                {
                  id: this.model.id
                }
              });
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
