import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Accesorio } from 'src/app/models/accesorio';
import { AccesorioService } from '../accesorio.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  model: Accesorio;
  submitted: boolean;
  formModel: FormGroup;
  passwordIcon: string;
  passwordConfirmationIcon: string;

  constructor(private modelService: AccesorioService, private router: Router, private title: Title) {
    this.title.setTitle('Nuevo repuesto');
    this.submitted = false;

    this.model = new Accesorio();
    this.formModel = new FormGroup({
      nombre: new FormControl(this.model.nombre, [
        Validators.required,
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
        this.model = new Accesorio();
        this.modelService.all(null, true).subscribe(() => {
          this.submitted = false;
          this.router.navigate(['/accesorios']);
        });
      }, err => {
        this.submitted = false;
      });
    } catch (error) {
      console.log(error);
    }
    return false;
  }
}
