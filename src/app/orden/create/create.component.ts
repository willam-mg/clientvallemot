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
import { Observable, Subscription } from 'rxjs';
import { finalize, map, shareReplay, startWith } from 'rxjs/operators';
import { MarcaModelos } from 'src/app/models/marca-modelos';

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
  fourtyFormGroup: FormGroup;
  accesorios: Array<Accesorio>;
  loading: boolean;
  colores: Array<string>;
  modelos: Array<string>;
  subscription: Subscription;
  listVehiculos: Array<string>;
  filteredOptions: Observable<string[]>;
  propietarioOptions: Observable<string[]>;
  placaOptions: Observable<string[]>;
  telefonoOptions: Observable<string[]>;
  modeloOptions: Observable<string[]>;
  colorOptions: Observable<string[]>;
  anoOptions: Observable<string[]>;
  marcasModelos: Array<MarcaModelos>;
  ordenes: Array<Orden>;
  listPropietario: Array<string>;
  listTelefono: Array<string>;
  listAno: Array<string>;
  listPlaca: Array<string>;

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
    this.loading = false;
    this.marcasModelos = [
      {
        marca: 'Toyota',
        modelos: [
          'Tundra',
          'Corolla',
          'Espacio',
        ]
      },
      {
        marca: 'Ford',
        modelos: [
          'ford TS789',
          'Ford89',
          'ford model',
        ]
      },
    ];
    this.colores = [
      'Blanco',
      'Negro',
      'Plata',
      'Gris',
      'Azul',
      'Rojo',
      'Amarillo',
      'Naranja',
      'Verde',
      'Violeta',
      'Café Claro',
    ];

    this.listAno = [
      '1990',
      '1991',
      '1992',
      '1993',
      '1994',
      '1995',
      '1996',
      '1997',
      '1998',
      '1999',
      '2000',
      '2001',
      '2002',
      '2003',
      '2004',
      '2005',
      '2006',
      '2007',
      '2007',
      '2008',
      '2010',
      '2011',
      '2012',
      '2013',
      '2014',
      '2015',
      '2016',
      '2017',
      '2018',
      '2019',
      '2020',
      '2021',
      '2022',
      '2023',
      '2024',
      '2025',
      '2026',
      '2027',
      '2028',
      '2029',
      '2030',
    ];

    this.listVehiculos = this.marcasModelos.map(element => element.marca);

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
    });
    this.thirtyFormGroup = this.formBuilder.group({
      color: new FormControl(this.model.color, [
        Validators.required
      ]),
      ano: new FormControl(this.model.ano),
      tanque: new FormControl(this.model.tanque)
    });
    this.fourtyFormGroup = this.formBuilder.group({
      solicitud: new FormControl(this.model.solicitud, [
        Validators.required,
        Validators.maxLength(300)
      ]),
      foto: new FormControl(this.model.foto),
      estado_vehiculo: new FormControl([]),
      estado_vehiculo_otros: new FormControl(this.model.estado_vehiculo_otros),
    });
    this.subscription = new Subscription();
  }

  ngOnInit() {
    this.filteredOptions = this.secondFormGroup.controls.vehiculo.valueChanges
      .pipe(
        startWith(''),
        map(value => this.myfilter(this.listVehiculos, value))
      );
    this.colorOptions = this.thirtyFormGroup.controls.color.valueChanges
      .pipe(
        startWith(''),
        map(value => this.myfilter(this.colores, value))
      );
    this.anoOptions = this.thirtyFormGroup.controls.ano.valueChanges
      .pipe(
        startWith(''),
        map(value => this.myfilter(this.listAno, String(value) ))
      );
    this.onSelectedVehiculo('Toyota');
    this.getAccesorios();
    this.listOrdenes();
  }

  initObserversAutoComplete() {
    this.propietarioOptions = this.firstFormGroup.controls.propietario.valueChanges
      .pipe(
        startWith(''),
        map(value => this.myfilter(this.listPropietario, value))
      );
    this.telefonoOptions = this.firstFormGroup.controls.telefono.valueChanges
      .pipe(
        startWith(''),
        map(value => this.myfilter(this.listTelefono, value))
      );
    this.placaOptions = this.secondFormGroup.controls.placa.valueChanges
      .pipe(
        startWith(''),
        map(value => this.myfilter(this.listPlaca, String(value)))
      );
  }

  private myfilter(list: Array<string>, value: string): string[] {
    const filterValue = value.toLowerCase();
    return list.filter(option => option.toLowerCase().includes(filterValue));
  }

  onSelectedVehiculo(nameMarca) {
    this.modelos = [];
    this.marcasModelos.forEach(element => {
      if (element.marca.toLowerCase() === nameMarca.toLowerCase()) {
        this.modelos = element.modelos;
        this.modeloOptions = this.secondFormGroup.controls.modelo.valueChanges
          .pipe(
            startWith(''),
            map(value => this.myfilter(this.modelos, value))
          );
      }
    });
  }

  onFileChange(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = (e: any) => {
        this.model.foto = e.target.result;
        this.fourtyFormGroup.patchValue({
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
        color: this.thirtyFormGroup.value.color,
        ano: this.thirtyFormGroup.value.ano,
        tanque: this.thirtyFormGroup.value.tanque,
        solicitud: this.fourtyFormGroup.value.solicitud,
        foto: this.fourtyFormGroup.value.foto,
        estado_vehiculo_otros: this.fourtyFormGroup.value.otros,
        estado_vehiculo: accesoriosSeleccionados
      };
      this.subscription.add(
        this.modelService.create(objToSend)
        .pipe(
          finalize( () => this.submitted = false)
        )
        .subscribe(async data => {
          this.model = new Orden();
          this.subscription.add(
            this.modelService.all(null, true).subscribe(() => {
              this.router.navigate(['/ordenes/show'], {
                queryParams:
                {
                  id: data.id
                }
              });
            })
          );
        })
      );
    } catch (error) {
      console.log(error);
    }
  }

  listOrdenes() {
    this.subscription.add(
      this.modelService.all(null, false)
        .pipe(
          map((data: any) => {
            return data.data;
          }),
          shareReplay(1)
        ).subscribe(data => {
          this.ordenes = data;
          this.listPropietario = this.ordenes.map(x => x.propietario).filter((value, index, self) => {
            return self.indexOf(value) === index;
          });
          this.listTelefono = this.ordenes.map(x => x.telefono).filter((value, index, self) => {
            return self.indexOf(value) === index;
          });
          this.listPlaca = this.ordenes.map(x => x.placa.toUpperCase()).filter((value, index, self) => {
            return self.indexOf(value) === index;
          });

          this.initObserversAutoComplete();
        })
    );
  }

  getAccesorios(reload = false) {
    this.loading = true;
    this.subscription.add(
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
        this.loading = false;
      })
    );
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
