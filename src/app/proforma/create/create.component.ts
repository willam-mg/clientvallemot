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
import { ProformaService } from '../proforma.service';
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
  proformaFormGroup: FormGroup;
  accesorios: Array<Accesorio>;
  loading: boolean;
  colores: Array<string>;
  modelos: Array<string>;
  subscription: Subscription;
  // listVehiculos: Array<string>;
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
    private modelService: ProformaService,
    private router: Router,
    private formBuilder: FormBuilder,
    private title: Title,
    public deviceService: DeviceDetectorService,
    public dialog: MatDialog,
    private accesorioService: AccesorioService,
    private navigationService: NavigationService) {
    this.title.setTitle('Nueva proforma');
    this.navigationService.setBack('/proformas');
    this.loading = false;
    this.marcasModelos = [
      {
        marca: 'Toyota',
        modelos: [
          'Carina E',
          '4runner',
          'Camry',
          'Rav4',
          'Celica',
          'Supra',
          'Paseo',
          'Land Cruiser 80',
          'Land Cruiser 100',
          'Land Cruiser',
          'Land Cruiser 90',
          'Corolla',
          'Auris',
          'Avensis',
          'Picnic',
          'Yaris',
          'Yaris Verso',
          'Mr2',
          'Previa',
          'Prius',
          'Avensis Verso',
          'Corolla Verso',
          'Corolla Sedan',
          'Aygo',
          'Hilux',
          'Dyna',
          'Land Cruiser 200',
          'Verso',
          'Iq',
          'Urban Cruiser',
          'Gt86',
        ]
      },
      {
        marca: 'Volkswagen',
        modelos: [
          'Passat',
          'Golf',
          'Vento',
          'Polo',
          'Corrado',
          'Sharan',
          'Lupo',
          'Bora',
          'Jetta',
          'New Beetle',
          'Phaeton',
          'Touareg',
          'Touran',
          'Multivan',
          'Caddy',
          'Golf Plus',
          'Fox',
          'Eos',
          'Caravelle',
          'Tiguan',
          'Transporter',
          'Lt',
          'Taro',
          'Crafter',
          'California',
          'Santana',
          'Scirocco',
          'Passat Cc',
          'Amarok',
          'Beetle',
          'Up',
          'Cc',
        ]
      },
      {
        marca: 'Volvo',
        modelos: [
          '440',
          '850',
          'S70',
          'V70',
          'V70 Classic',
          '940',
          '480',
          '460',
          '960',
          'S90',
          'V90',
          'Classic',
          'S40',
          'V40',
          'V50',
          'V70 Xc',
          'Xc70',
          'C70',
          'S80',
          'S60',
          'Xc90',
          'C30',
          '780',
          '760',
          '740',
          '240',
          '360',
          '340',
          'Xc60',
          'V60',
          'V40 Cross Country',
        ]
      },
      {
        marca: 'Suzuki',
        modelos: [
          'Maruti',
          'Swift',
          'Vitara',
          'Baleno',
          'Samurai',
          'Alto',
          'Wagon R',
          'Jimny',
          'Grand Vitara',
          'Ignis',
          'Liana',
          'Grand Vitara Xl7',
          'Sx4',
          'Splash',
          'Kizashi',
        ]
      },
      {
        marca: 'Subaru',
        modelos: [
          'Legacy',
          'Impreza',
          'Svx',
          'Justy',
          'Outback',
          'Forester',
          'G3x Justy',
          'B9 Tribeca',
          'Xt',
          '1800',
          'Tribeca',
          'Wrx Sti',
          'Trezia',
          'Xv',
          'Brz',
        ]
      },
      {
        marca: 'Nissan',
        modelos: [
          'Terrano Ii',
          'Terrano',
          'Micra',
          'Sunny',
          'Primera',
          'Serena',
          'Patrol',
          'Maxima Qx',
          '200 Sx',
          '300 Zx',
          'Patrol Gr',
          '100 Nx',
          'Almera',
          'Pathfinder',
          'Almera Tino',
          'Xtrail',
          '350z',
          'Murano',
          'Note',
          'Qashqai',
          'Tiida',
          'Vanette',
          'Trade',
          'Vanette Cargo',
          'Pickup',
          'Navara',
          'Cabstar E',
          'Cabstar',
          'Maxima',
          'Camion',
          'Prairie',
          'Bluebird',
          'Np300 Pick Up',
          'Qashqai2',
          'Pixo',
          'Gtr',
          '370z',
          'Cube',
          'Juke',
          'Leaf',
          'Evalia',
        ]
      },
      {
        marca: 'Ford',
        modelos: [
          'Maverick',
          'Escort',
          'Focus',
          'Mondeo',
          'Scorpio',
          'Fiesta',
          'Probe',
          'Explorer',
          'Galaxy',
          'Ka',
          'Puma',
          'Cougar',
          'Focus Cmax',
          'Fusion',
          'Streetka',
          'Cmax',
          'Smax',
          'Transit',
          'Courier',
          'Ranger',
          'Sierra',
          'Orion',
          'Pick Up',
          'Capri',
          'Granada',
          'Kuga',
          'Grand Cmax',
          'Bmax',
          'Tourneo Custom',
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

    // this.listVehiculos = this.marcasModelos.map(element => element.marca);

    this.submitted = false;
    this.model = new Orden();
    const today = moment();
    this.model.fecha = today.format('YYYY-MM-DD');
    this.proformaFormGroup = this.formBuilder.group({
      remitente: new FormControl(this.model.remitente, [
        Validators.required,
      ]),
      propietario: new FormControl(this.model.propietario, [
        Validators.required,
        Validators.maxLength(50)
      ]),
      telefono: new FormControl(this.model.telefono, [
        Validators.required,
      ]),
      marca: new FormControl(this.model.marca, [
        Validators.required,
      ]),
      clase: new FormControl(this.model.clase, [
        Validators.required,
      ]),
      modelo: new FormControl(this.model.modelo, [
        Validators.maxLength(50)
      ]),
      placa: new FormControl(this.model.placa, [
        Validators.required,
      ]),
      fecha_cotizacion: new FormControl(this.model.fecha_cotizacion, [
        Validators.required,
      ]),
      fecha: new FormControl(this.model.fecha, [
        Validators.required,
      ]),
    });
    this.subscription = new Subscription();
  }

  ngOnInit() {
    this.listOrdenes();
  }

  initObserversAutoComplete() {
    this.propietarioOptions = this.proformaFormGroup.controls.propietario.valueChanges
      .pipe(
        startWith(''),
        map(value => this.myfilter(this.listPropietario, value))
      );
    this.telefonoOptions = this.proformaFormGroup.controls.telefono.valueChanges
      .pipe(
        startWith(''),
        map(value => this.myfilter(this.listTelefono, value))
      );
    this.placaOptions = this.proformaFormGroup.controls.placa.valueChanges
      .pipe(
        startWith(''),
        map(value => this.myfilter(this.listPlaca, String(value)))
      );
  }

  private myfilter(list: Array<string>, value: string): string[] {
    const filterValue = value.toLowerCase();
    return list.filter(option => option.toLowerCase().includes(filterValue));
  }

  onSubmit() {
    try {
      if ( this.proformaFormGroup.invalid ) {
        throw new Error('Entrada de datos invalido');
      }
      this.submitted = true;
      this.proformaFormGroup.value.fecha = moment(this.proformaFormGroup.value.fecha).format('YYYY-MM-DD');
      this.proformaFormGroup.value.fecha_cotizacion = moment(this.proformaFormGroup.value.fecha_cotizacion).format('YYYY-MM-DD');

      const objToSend = {
        remitente: this.proformaFormGroup.value.remitente,
        propietario: this.proformaFormGroup.value.propietario,
        telefono: this.proformaFormGroup.value.telefono,
        marca: this.proformaFormGroup.value.marca,
        clase: this.proformaFormGroup.value.clase,
        modelo: this.proformaFormGroup.value.modelo,
        placa: this.proformaFormGroup.value.placa,
        fecha_cotizacion: this.proformaFormGroup.value.fecha_cotizacion,
        fecha: this.proformaFormGroup.value.fecha,
        es_proforma: 1,
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
              this.router.navigate(['/proformas/show'], {
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
      this.modelService.all(null, false, null)
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

}
