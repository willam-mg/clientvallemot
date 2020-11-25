import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, Validators } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { DeviceDetectorService } from 'ngx-device-detector';
import { AccesorioService } from 'src/app/accesorio/accesorio.service';
import { Accesorio } from 'src/app/models/accesorio';
import { Orden } from 'src/app/models/orden';
import { OrdenService } from '../orden.service';

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
  accesorios: Array<Accesorio>;

  constructor(private modelService: OrdenService,
              private router: Router,
              private formBuilder: FormBuilder,
              private title: Title,
              public deviceService: DeviceDetectorService,
              private accesorioService: AccesorioService) {
    this.title.setTitle('Nueva Orden');
    this.getAccesorios();
  }

  ngOnInit() {
    this.submitted = false;
    this.model = new Orden();
    const today = moment();
    this.model.fecha = today.format('YYYY-MM-DD');
    // this.model.fecha = new Date().toISOString().slice(0, 10);

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
      // firstCtrl: ['', Validators.required]
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
        Validators.maxLength(50)
      ]),
      ano: new FormControl(this.model.ano, [
        Validators.maxLength(50)
      ]),
      tanque: new FormControl(this.model.tanque, [
        Validators.maxLength(50)
      ]),
      foto: new FormControl(this.model.foto),
    });
    this.getAccesorios();
    this.model.radio = true;
    this.model.focos = true;
    this.thirtyFormGroup = this.formBuilder.group({
      solicitud: new FormControl(this.model.solicitud, [
        Validators.required,
        Validators.maxLength(300)
      ]),
      estado_vehiculo_otros: new FormControl(this.model.estado_vehiculo_otros, [
        Validators.maxLength(300)
      ]),
      // accesorios: this.formBuilder.array([true, false, true]),
      tapa_ruedas: new FormControl(this.model.tapa_ruedas),
      llanta_auxilio: new FormControl(this.model.llanta_auxilio),
      gata_hidraulica: new FormControl(this.model.gata_hidraulica),
      llave_cruz: new FormControl(this.model.llave_cruz),
      pisos: new FormControl(this.model.pisos),
      limpia_parabrisas: new FormControl(this.model.limpia_parabrisas),
      tapa_tanque: new FormControl(this.model.tapa_tanque),
      herramientas: new FormControl(this.model.herramientas),
      mangueras: new FormControl(this.model.mangueras),
      espejos: new FormControl(this.model.espejos),
      tapa_cubos: new FormControl(this.model.tapa_cubos),
      antena: new FormControl(this.model.antena),
      radio: new FormControl(this.model.radio),
      focos: new FormControl(this.model.focos),
    });
  }

  onFileChange(event) {
    let reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = (e: any) => {
        this.model.foto = e.target.result;
        this.secondFormGroup.patchValue({
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
      const objToSend = {
        propietario: this.firstFormGroup.value.propietario,
        telefono: this.firstFormGroup.value.telefono,
        vehiculo: this.secondFormGroup.value.vehiculo,
        placa: this.secondFormGroup.value.placa,
        modelo: this.secondFormGroup.value.modelo,
        color: this.secondFormGroup.value.color,
        ano: this.secondFormGroup.value.ano,
        foto: this.secondFormGroup.value.foto,

        tanque: this.secondFormGroup.value.tanque,
        solicitud: this.thirtyFormGroup.value.solicitud,
        estado_vehiculo_otros: this.thirtyFormGroup.value.otros,

        tapa_ruedas: this.thirtyFormGroup.value.tapa_ruedas,
        llanta_auxilio: this.thirtyFormGroup.value.llanta_auxilio,
        gata_hidraulica: this.thirtyFormGroup.value.gata_hidraulica,
        llave_cruz: this.thirtyFormGroup.value.llave_cruz,
        pisos: this.thirtyFormGroup.value.pisos,
        limpia_parabrisas: this.thirtyFormGroup.value.limpia_parabrisas,
        tapa_tanque: this.thirtyFormGroup.value.tapa_tanque,
        herramientas: this.thirtyFormGroup.value.herramientas,
        mangueras: this.thirtyFormGroup.value.mangueras,
        espejos: this.thirtyFormGroup.value.espejos,
        tapa_cubos: this.thirtyFormGroup.value.tapa_cubos,
        antena: this.thirtyFormGroup.value.antena,
        radio: this.thirtyFormGroup.value.radio,
        focos: this.thirtyFormGroup.value.focos,
      };
      this.modelService.create(objToSend).subscribe(async data => {
        this.model = new Orden();
        this.modelService.all(null, true).subscribe(() => {
          this.submitted = false;
          // this.router.navigate(['/ordenes']);
          this.router.navigate(['/ordenes/show'], {
            queryParams:
            {
              id: data.id
            }
          });
        });
      }, err => {
        this.submitted = false;
      });
    } catch (error) {
      console.log(error);
    }
  }

  getAccesorios() {
    this.accesorioService.all(null, true).subscribe(data => {
      // this.submitted = false;
      this.accesorios = data.data.map((item) => {
        return {
          id: item.id,
          nombre: item.nombre,
          checked: false
        };
      });
      // this.notFound = true;
    });
  }


}
