import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { Mecanico } from 'src/app/models/mecanico';
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
  // formModel: FormGroup;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirtyFormGroup: FormGroup;

  constructor(private modelService: OrdenService, private router: Router, private _formBuilder: FormBuilder) {

  }

  ngOnInit() {
    this.submitted = false;
    this.model = new Orden;
    this.model.fecha = moment().format('YYYY-MM-DD');

    this.firstFormGroup = this._formBuilder.group({
      propietario: new FormControl(this.model.propietario, [
        Validators.required,
        Validators.maxLength(50)
      ]),
      telefono: new FormControl(this.model.telefono, [
        Validators.required,
        Validators.maxLength(50)
      ]),
      fecha: new FormControl(this.model.fecha, [
        Validators.required,
      ]),
      // firstCtrl: ['', Validators.required]
    });


    this.secondFormGroup = this._formBuilder.group({
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
    });
    
    
    
    this.thirtyFormGroup = this._formBuilder.group({
      solicitud: new FormControl(this.model.solicitud, [
        Validators.required,
        Validators.maxLength(300)
      ]),
      otros: new FormControl(this.model.otros, [
        Validators.required,
        Validators.maxLength(300)
      ]),
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



  onSubmit() {
    try {
      if ( this.firstFormGroup.invalid && this.secondFormGroup.invalid && this.thirtyFormGroup.invalid ) {
        throw " Entrada de datos invalido ";
      }
      this.submitted = true;
      this.firstFormGroup.value.fecha = moment(this.firstFormGroup.value.fecha).format('YYYY-MM-DD');
      let objToSend = {
        'propietario': this.firstFormGroup.value.propietario,
        'telefono': this.firstFormGroup.value.telefono,
        'fecha': this.firstFormGroup.value.fecha,
        'vehiculo': this.secondFormGroup.value.vehiculo,
        'placa': this.secondFormGroup.value.placa,
        'modelo': this.secondFormGroup.value.modelo,
        'color': this.secondFormGroup.value.color,
        'ano': this.secondFormGroup.value.ano,
        'tanque': this.secondFormGroup.value.tanque,
        'solicitud': this.thirtyFormGroup.value.solicitud,
        'tapa_ruedas': this.thirtyFormGroup.value.tapa_ruedas,
        'llanta_auxilio': this.thirtyFormGroup.value.llanta_auxilio,
        'gata_hidraulica': this.thirtyFormGroup.value.gata_hidraulica,
        'llave_cruz': this.thirtyFormGroup.value.llave_cruz,
        'pisos': this.thirtyFormGroup.value.pisos,
        'limpia_parabrisas': this.thirtyFormGroup.value.limpia_parabrisas,
        'tapa_tanque': this.thirtyFormGroup.value.tapa_tanque,
        'herramientas': this.thirtyFormGroup.value.herramientas,
        'mangueras': this.thirtyFormGroup.value.mangueras,
        'espejos': this.thirtyFormGroup.value.espejos,
        'tapa_cubos': this.thirtyFormGroup.value.tapa_cubos,
        'antena': this.thirtyFormGroup.value.antena,
        'radio': this.thirtyFormGroup.value.radio,
        'focos': this.thirtyFormGroup.value.focos,
        'otros': this.thirtyFormGroup.value.otros,
        'responsable': null,
        'fecha_ingreso': this.firstFormGroup.value.fecha,
        'fecha_salida': null,
        'km_actual': null,
        'proximo_cambio': null,
        'pago': null,
        'detalle_pago': null,
        'estado': 0,
      };
      this.modelService.create(objToSend).subscribe(async data => {
        this.model = new Orden();
        this.modelService.all(null, true).subscribe((data) => {
          this.submitted = false;
          this.router.navigate(['/ordenes']);
        });
      }, err => {
        this.submitted = false;
      });
    } catch (error) {
      console.log(error);
    }
  }


}
