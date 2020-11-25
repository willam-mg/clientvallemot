import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Orden } from 'src/app/models/orden';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { OrdenService } from '../orden.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  model: Orden;
  id: any;
  submitted: boolean;
  formModel: FormGroup;

  constructor(private route: ActivatedRoute,
              private modelService: OrdenService,
              private router: Router,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    this.model = new Orden();
    this.route.queryParams.subscribe(params => {
      this.id = params.id;
      if (!this.id) {
        this.router.navigate(['/mecanicos']);
      }
    });
    this.formModel = new FormGroup({
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

      solicitud: new FormControl(this.model.solicitud, [
        Validators.required,
        Validators.maxLength(300)
      ]),
      estado_vehiculo_otros: new FormControl(this.model.estado_vehiculo_otros, [
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
      foto: new FormControl(null),
      estado: new FormControl(0),
      km_actual: new FormControl(this.model.km_actual),
      proximo_cambio: new FormControl(this.model.proximo_cambio),
      pago: new FormControl(this.model.pago, [
        Validators.maxLength(50)
      ]),
      detalle_pago: new FormControl(this.model.detalle_pago),
    });
    this.loadData();
  }

  loadData() {
    this.modelService.show(this.id).subscribe(data => {
      this.model = data;
      this.formModel.setValue({
        propietario: this.model.propietario,
        telefono: this.model.telefono,
        fecha: this.model.fecha,
        vehiculo: this.model.vehiculo,
        placa: this.model.placa,
        modelo: this.model.modelo,
        color: this.model.color,
        ano: this.model.ano,
        tanque: this.model.tanque,
        solicitud: this.model.solicitud,
        estado_vehiculo_otros: this.model.estado_vehiculo_otros,
        tapa_ruedas: this.model.tapa_ruedas,
        llanta_auxilio: this.model.llanta_auxilio,
        gata_hidraulica: this.model.gata_hidraulica,
        llave_cruz: this.model.llave_cruz,
        pisos: this.model.pisos,
        limpia_parabrisas: this.model.limpia_parabrisas,
        tapa_tanque: this.model.tapa_tanque,
        herramientas: this.model.herramientas,
        mangueras: this.model.mangueras,
        espejos: this.model.espejos,
        tapa_cubos: this.model.tapa_cubos,
        antena: this.model.antena,
        radio: this.model.radio,
        focos: this.model.focos,
        foto: this.model.foto,
        estado: this.model.estado,
        km_actual: this.model.km_actual,
        proximo_cambio: this.model.proximo_cambio,
        pago: this.model.pago,
        detalle_pago: this.model.detalle_pago,
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
              this.router.navigate(['/ordenes/show'], {
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
