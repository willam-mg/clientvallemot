import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { DeviceDetectorService } from 'ngx-device-detector';
import { AccesorioService } from 'src/app/accesorio/accesorio.service';
import { Orden } from 'src/app/models/orden';
import { OrdenService } from '../orden.service';
import { AccesoriosComponent } from '../shared/accesorios/accesorios.component';
import { NavigationService } from 'src/app/shared/services/navigation.service';
import { Accesorio } from 'src/app/models/accesorio';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})

export class CreateComponent implements OnInit {
  model: Orden;
  submitted: boolean;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirtyFormGroup: FormGroup;
  typesOfShoes: Array<string>;
  accesorios: Array<Accesorio>;

  constructor(
    private modelService: OrdenService,
    private router: Router,
    private formBuilder: FormBuilder,
    private title: Title,
    public deviceService: DeviceDetectorService,
    public dialog: MatDialog,
    private accesorioService: AccesorioService,
    private navigationService: NavigationService) {
    this.title.setTitle('Nueva Orden');
    this.navigationService.setBack('/ordenes');
  }

  ngOnInit() {
    this.submitted = false;
    this.model = new Orden();
    const today = moment();
    this.model.fecha = today.format('YYYY-MM-DD');

    this.firstFormGroup = this.formBuilder.group({
      propietario: new FormControl(this.model.propietario, [
        Validators.required,
        Validators.maxLength(50)
      ]),
      telefono: new FormControl(this.model.telefono, [
        Validators.required,
        Validators.maxLength(50)
      ]),
      fecha: new FormControl(new Date(), [
        Validators.required,
      ]),
    });


    this.secondFormGroup = this.formBuilder.group({
      vehiculo: new FormControl(this.model.vehiculo, [
        Validators.required,
        Validators.maxLength(50)
      ]),
      placa: new FormControl(this.model.placa, [
        Validators.required,
        Validators.maxLength(50)
      ]),
      modelo: new FormControl(this.model.modelo, [
        Validators.maxLength(50)
      ]),
      color: new FormControl(this.model.color, [
        Validators.required,
        Validators.maxLength(50)
      ]),
      ano: new FormControl(this.model.ano, [
        Validators.maxLength(50)
      ]),
      tanque: new FormControl(this.model.tanque, [
        Validators.maxLength(50)
      ])
    });
    this.thirtyFormGroup = this.formBuilder.group({
      solicitud: new FormControl(this.model.solicitud, [
        Validators.required,
        Validators.maxLength(300)
      ]),
      foto: new FormControl(this.model.foto),
      estado_vehiculo: new FormControl([]),
      estado_vehiculo_otros: new FormControl(this.model.estado_vehiculo_otros, [
        Validators.maxLength(300)
      ]),
    });

    this.typesOfShoes = [
      'tapa_ruedas',
      'llanta_auxilio',
      'gata_hidraulica',
      'llave_cruz',
      'pisos',
      'limpia_parabrisas',
      'tapa_tanque',
      'herramientas',
      'mangueras',
      'espejos',
      'tapa_cubos',
      'antena',
      'radio',
      'focos',
    ];
    this.getAccesorios();
  }

  onFileChange(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = (e: any) => {
        this.model.foto = e.target.result;
        this.thirtyFormGroup.patchValue({
          foto: reader.result
        });
      };
    }
  }

  onSubmit() {
    try {
      if ( this.firstFormGroup.invalid && this.secondFormGroup.invalid && this.thirtyFormGroup.invalid ) {
        throw new Error('Entrada de datos invalido');
      }
      this.submitted = true;
      this.firstFormGroup.value.fecha = moment(this.firstFormGroup.value.fecha).format('YYYY-MM-DD');
      const accesoriosSeleccionados = this.accesorios.filter(element => element.checked === true);

      const objToSend = {
        propietario: this.firstFormGroup.value.propietario,
        telefono: this.firstFormGroup.value.telefono,
        vehiculo: this.secondFormGroup.value.vehiculo,
        placa: this.secondFormGroup.value.placa,
        modelo: this.secondFormGroup.value.modelo,
        color: this.secondFormGroup.value.color,
        ano: this.secondFormGroup.value.ano,
        tanque: this.secondFormGroup.value.tanque,

        solicitud: this.thirtyFormGroup.value.solicitud,
        foto: this.thirtyFormGroup.value.foto,
        estado_vehiculo_otros: this.thirtyFormGroup.value.otros,
        estado_vehiculo: accesoriosSeleccionados
      };

      this.modelService.create(objToSend).subscribe(async data => {
        this.model = new Orden();
        this.modelService.all(null, true).subscribe(() => {
          this.submitted = false;
          this.router.navigate(['/ordenes/show'], {
            queryParams:
            {
              id: data.id
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

  getAccesorios(reload = false) {
    this.accesorioService.todos(reload).subscribe(data => {
      this.accesorios = data.map((element) => {
        let check = false;
        if (element.nombre === 'radio') {
          check = true;
        }
        if (element.nombre === 'focos') {
          check = true;
        }
        return {
          id: element.id,
          nombre: element.nombre,
          checked: check
        };
      });
    });
  }

  selectAccesorios() {
    this.dialog.open(AccesoriosComponent, {
      data: {
        accesorios: this.accesorios,
      },
      disableClose: true
    }).afterClosed().subscribe(res => {
      this.accesorios = res;
    });
  }


}
