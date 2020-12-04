import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Accesorio } from 'src/app/models/accesorio';
import { AccesorioService } from '../accesorio.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  accesorios: Array<Accesorio>;
  notFound: boolean;
  submitted: boolean;
  displayedColumns: string[] = [
    'nombre',
  ];
  filterSearch: Accesorio;
  formSearch: FormGroup;
  showSearch: boolean;

  constructor(public modelService: AccesorioService, private title: Title) {
    this.title.setTitle('Accesorios');
    this.accesorios = [];
    this.notFound = false;
    this.submitted = false;
    this.filterSearch = new Accesorio();
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
      this.accesorios = data.data;
      this.notFound = true;
    });
  }

  pagination(event) {
    this.modelService.page.setValues((event.pageIndex + 1), event.length, event.pageSize);
    this.list(true);
  }
}
