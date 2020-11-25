import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { RepuestoService } from 'src/app/repuesto/repuesto.service';
import { Repuesto } from 'src/app/models/repuesto';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  repuestos: Array<Repuesto>;
  notFound: boolean;
  submitted: boolean;
  displayedColumns: string[] = [
    'nombre',
    'precio',
  ];
  filterSearch: Repuesto;
  formSearch: FormGroup;
  showSearch:boolean;

  constructor(public modelService: RepuestoService, private title:Title) {
    this.title.setTitle('Repuestos');
    this.repuestos = [];
    this.notFound = false;
    this.submitted = false;
    this.filterSearch = new Repuesto();
    this.formSearch = new FormGroup({
      nombre: new FormControl(this.filterSearch.nombre, []),
    });
    this.showSearch = false;
  }

  ngOnInit() {
    this.list();
  }

  list(reload = false) {
    this.submitted = true;
    this.notFound = false;
    this.modelService.all(this.formSearch.value, reload).subscribe(data => {
      this.submitted = false;
      this.repuestos = data.data;
      this.notFound = true;
    });
  }

  pagination(event) {
    this.modelService.page.setValues((event.pageIndex + 1), event.length, event.pageSize);
    this.list(true);
  }
}
