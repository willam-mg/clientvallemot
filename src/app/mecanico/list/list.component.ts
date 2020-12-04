import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Mecanico } from 'src/app/models/mecanico';
import { NavigationService } from 'src/app/shared/services/navigation.service';
import { MecanicoService } from '../mecanico.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  mecanicos: Array<Mecanico>;
  notFound: boolean;
  submitted: boolean;
  displayedColumns: string[] = [
    'nombre_completo',
    'ci',
    'especialidad',
    'telefono',
    'direccion',
    'actions',
  ];
  filterSearch: Mecanico;
  formSearch: FormGroup;
  showSearch: boolean;

  constructor(
    public modelService: MecanicoService, 
    private title: Title, 
    private navigationService: NavigationService) {
    this.navigationService.setBack('/');
    this.title.setTitle('Mecanicos');
    this.mecanicos = [];
    this.notFound = false;
    this.submitted = false;
    this.filterSearch = new Mecanico();
    this.formSearch = new FormGroup({
      nombre_completo: new FormControl(this.filterSearch.nombre_completo, []),
      ci: new FormControl(this.filterSearch.ci, []),
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
      this.mecanicos = data.data;
      this.notFound = true;
    });
  }

  pagination(event) {
    this.modelService.page.setValues((event.pageIndex + 1), event.length, event.pageSize);
    this.list(true);
  }


}
