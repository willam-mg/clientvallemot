import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment';
import { forkJoin, Subscription } from 'rxjs';
import { finalize, map } from 'rxjs/operators';
import { AccesorioService } from 'src/app/accesorio/accesorio.service';
import { MecanicoService } from 'src/app/mecanico/mecanico.service';
import { Accesorio } from 'src/app/models/accesorio';
import { Mecanico } from 'src/app/models/mecanico';
import { Orden } from 'src/app/models/orden';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { NavigationService } from 'src/app/shared/services/navigation.service';
import { OrdenService } from '../orden.service';
import { AccesoriosComponent } from '../shared/accesorios/accesorios.component';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit, OnDestroy {
  model: Orden;
  submitted: boolean;
  formModel: FormGroup;
  accesorios: Array<Accesorio>;
  mecanicos: Array<Mecanico>;
  loading: boolean;
  subscripction: Subscription;

  constructor(
    private route: ActivatedRoute,
    private modelService: OrdenService,
    private router: Router,
    public dialog: MatDialog,
    private navigationService: NavigationService,
    private mecanicoService: MecanicoService,
    private accesorioService: AccesorioService) {
    this.loading = false;
    this.model = new Orden();
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
      fecha_salida: new FormControl(this.model.fecha_salida),
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
      foto: new FormControl(this.model.foto),
      estado: new FormControl(this.model.estado),
      km_actual: new FormControl(this.model.km_actual),
      proximo_cambio: new FormControl(this.model.proximo_cambio),
      pago: new FormControl(this.model.pago, [
        Validators.maxLength(50)
      ]),
      detalle_pago: new FormControl(this.model.detalle_pago),
      mecanico_id: new FormControl(this.model.mecanico_id),
    });
    this.subscripction = new Subscription();
  }

  ngOnInit() {
    this.getParamId();
    this.getMecanicos();
  }

  ngOnDestroy(){
    this.subscripction.unsubscribe();
  }
  
  getParamId(){
    this.subscripction.add(
      this.route.queryParams.subscribe(params => {
        this.navigationService.setBack('/ordenes/show', params.id);
        this.getModel(params.id);
      })
    );
  }

  getModel(id: number) {
    this.subscripction.add(
      this.modelService.show(id).subscribe(data => {
        this.model = data;
        this.formModel.setValue({
          propietario: this.model.propietario,
          telefono: this.model.telefono,
          fecha: this.model.fecha,
          fecha_salida: this.model.fecha_salida,
          vehiculo: this.model.vehiculo,
          placa: this.model.placa,
          modelo: this.model.modelo,
          color: this.model.color,
          ano: this.model.ano,
          tanque: this.model.tanque,
          solicitud: this.model.solicitud,
          estado_vehiculo_otros: this.model.estado_vehiculo_otros,
          foto: this.model.foto,
          estado: this.model.estado,
          km_actual: this.model.km_actual,
          proximo_cambio: this.model.proximo_cambio,
          pago: this.model.pago,
          detalle_pago: this.model.detalle_pago,
          mecanico_id: this.model.mecanico_id,
        });
        this.getAccesorios();
      })
    );
  }

  getAccesorios() {
    this.subscripction.add(
      this.accesorioService.todos()
      .pipe(
        map( (res: Accesorio[]) => 
          res.map( (data) => {
            return {
              id: data.id,
              nombre: data.nombre,
              checked: this.model.estadoVehiculo.some(elm => elm.accesorio_id == data.id)
            };
          })
        )
      )
      .subscribe(data => {
        this.accesorios = data;
      })
    );
  }

  getMecanicos() {
    this.subscripction.add(
      this.mecanicoService.todos().subscribe(data => {
        this.mecanicos = data;
      })
    );
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
          this.formModel.value.fecha = moment(this.formModel.value.fecha).format('YYYY-MM-DD');
          if (this.formModel.value.proximo_cambio){
            this.formModel.value.proximo_cambio = moment(this.formModel.value.proximo_cambio).format('YYYY-MM-DD');
          }
          if (this.formModel.value.fecha_salida){
            this.formModel.value.fecha_salida = moment(this.formModel.value.fecha_salida).format('YYYY-MM-DD');
          }

          const objToSend = {
            propietario: this.formModel.value.propietario,
            telefono: this.formModel.value.telefono,
            fecha: this.formModel.value.fecha,
            fecha_salida: this.formModel.value.fecha_salida,
            vehiculo: this.formModel.value.vehiculo,
            placa: this.formModel.value.placa,
            modelo: this.formModel.value.modelo,
            color: this.formModel.value.color,
            ano: this.formModel.value.ano,
            tanque: this.formModel.value.tanque,

            solicitud: this.formModel.value.solicitud,
            foto: this.formModel.value.foto,
            estado_vehiculo_otros: this.formModel.value.otros,
            estado_vehiculo: this.accesorios.filter(element => element.checked === true),
            km_actual: this.formModel.value.km_actual,
            proximo_cambio: this.formModel.value.proximo_cambio,
            pago: this.formModel.value.pago,
            estado: this.formModel.value.estado,
            mecanico_id: this.formModel.value.mecanico_id,
          };

          this.modelService.update(this.model.id, objToSend).subscribe(async data => {
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
