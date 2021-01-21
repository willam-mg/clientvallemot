import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Subscription } from 'rxjs/internal/Subscription';
import { Mecanico } from 'src/app/models/mecanico';
import { NavigationService } from 'src/app/shared/services/navigation.service';
import { MecanicoService } from '../mecanico.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  model: Mecanico;
  submitted: boolean;
  formModel: FormGroup;
  passwordIcon: string;
  passwordConfirmationIcon: string;
  subsription: Subscription;

  constructor(
    private modelService: MecanicoService,
    private router: Router,
    private title: Title,
    private navigationService: NavigationService) {
    this.navigationService.setBack('/mecanicos');
    this.title.setTitle('Nuevo mecanico');
    this.submitted = false;
    this.model = new Mecanico();
    this.model.fecha_ingreso = moment().format('YYYY-MM-DD');
    this.model.fecha_salida = moment().format('YYYY-MM-DD');
    this.formModel = new FormGroup({
      nombre_completo: new FormControl(this.model.nombre_completo, [
        Validators.required,
        Validators.maxLength(50)
      ]),
      telefono: new FormControl(this.model.telefono, [
        Validators.required,
      ]),
      direccion: new FormControl(this.model.direccion, [
        Validators.maxLength(250)
      ]),
      ci: new FormControl(this.model.ci, [
        Validators.required,
      ]),
      email: new FormControl(this.model.email, [
        Validators.required,
      ]),
      password: new FormControl(12345678, [
        Validators.required,
      ]),
      especialidad: new FormControl(this.model.especialidad),
      fecha_ingreso: new FormControl(this.model.fecha_ingreso),
      fecha_salida: new FormControl(this.model.fecha_salida),
      foto: new FormControl(null),
    });
    this.subsription = new Subscription();
  }

  ngOnInit() {
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
    try {
      if (this.formModel.invalid) {
        throw new Error('Entrada de datos invalido');
      }
      this.submitted = true;
      this.formModel.value.fecha_ingreso = moment(this.formModel.value.fecha_ingreso).format('YYYY-MM-DD');
      this.formModel.value.fecha_salida = moment(this.formModel.value.fecha_salida).format('YYYY-MM-DD');
      this.subsription.add(
        this.modelService.create(this.formModel.value).subscribe(async data => {
          this.model = new Mecanico();
          this.modelService.all(null, true).subscribe(() => {
            this.submitted = false;
            this.router.navigate(['/mecanicos']);
          });
        })
      );
    } catch (error) {
      console.log(error);
    }
  }

}
