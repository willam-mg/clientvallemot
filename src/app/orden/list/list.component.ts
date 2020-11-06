import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Orden } from 'src/app/models/orden';
import { OrdenService } from '../orden.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  ordenes: Array<Orden>;
  notFound: boolean;
  submitted: boolean;
  displayedColumns: string[] = [
    'nombre_completo',
    'vehiculo',
    'placa',
    'modelo',
    'color',
    'ano',
    'tanque',
    'solicitud',
    'fecha_ingreso',
    'fecha_salida',
    'km_actual',
    'proximo_cambio',
    'pago',
    'otros',
    'actions',
  ];
  filterSearch: Orden;
  formSearch: FormGroup;

  constructor(public modelService: OrdenService) {
    this.ordenes = [];
    this.notFound = false;
    this.submitted = false;
    this.filterSearch = new Orden();
    this.formSearch = new FormGroup({
      propietario: new FormControl(this.filterSearch.propietario, []),
      placa: new FormControl(this.filterSearch.placa, []),
    });
  }

  ngOnInit() {
    this.list();
  }

  list(reload = false) {
    this.submitted = true;
    this.notFound = false;
    this.modelService.all(this.formSearch.value, reload).subscribe(data => {
      this.submitted = false;
      this.ordenes = data.data;
      this.notFound = true;
    });
  }

  pagination(event) {
    this.modelService.page.setValues((event.pageIndex + 1), event.length, event.pageSize);
    this.list(true);
  }

}
