import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Repuesto } from 'src/app/models/repuesto';
import { NavigationService } from 'src/app/shared/services/navigation.service';
import { RepuestoService } from '../repuesto.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  model: Repuesto;
  submitted: boolean;
  formModel: FormGroup;
  passwordIcon: string;
  passwordConfirmationIcon: string;

  constructor(
    private modelService: RepuestoService,
    private router: Router,
    private title: Title,
    private navigationService: NavigationService) {
    this.navigationService.setBack('/repuestos');
    this.title.setTitle('Nuevo repuesto');
    this.submitted = false;

    this.model = new Repuesto();
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
  }

  ngOnInit() {
  }

  onSubmit() {
    try {
      if (this.formModel.invalid) {
        throw new Error('Entrada de datos invalido');
      }
      this.submitted = true;
      this.modelService.create(this.formModel.value).subscribe(async data => {
        this.model = new Repuesto();
        this.modelService.all(null, true).subscribe((data1) => {
          this.submitted = false;
          this.router.navigate(['/repuestos']);
        });
      }, err => {
        this.submitted = false;
      });
    } catch (error) {
      console.log(error);
    }
  }


}
