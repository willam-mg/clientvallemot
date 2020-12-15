import { Component, OnInit, AfterViewInit, AfterContentInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Observable, Observer, Subscription } from 'rxjs';
import { LoginService } from 'src/app/login/login.service';
import { Orden } from 'src/app/models/orden';
import { User } from 'src/app/models/user';
import { NavigationService } from 'src/app/shared/services/navigation.service';
import { OrdenService } from '../orden.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit, OnDestroy {
  ordenes: Array<Orden>;
  notFound: boolean;
  loading: boolean;
  submitted: boolean;
  displayedColumns: string[] = [
    'propietario',
    'vehiculo',
    'placa',
    'modelo',
    'color',
    'ano',
    'actions',
  ];
  filterSearch: Orden;
  formSearch: FormGroup;
  userData: User;
  showSearch: boolean;
  subscription: Subscription;

  constructor(
    public modelService: OrdenService,
    private title: Title,
    public loginService: LoginService,
    private navigationService: NavigationService) {
    this.userData = loginService.getUser();
    this.title.setTitle('Ordenes');
    this.navigationService.setBack('/');
    this.notFound = false;
    this.submitted = false;
    this.filterSearch = new Orden();
    this.formSearch = new FormGroup({
      propietario: new FormControl(this.filterSearch.propietario, []),
      placa: new FormControl(this.filterSearch.placa, []),
      modelo: new FormControl(this.filterSearch.modelo, []),
      color: new FormControl(this.filterSearch.color, []),
      estado: new FormControl(this.filterSearch.estado),
    });
    this.showSearch = false;
    this.loading = false;
    this.subscription = new Subscription();
  }

  ngOnInit() {
    this.list(true);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  list(reload = false) {
    this.submitted = true;
    this.loading = true;
    this.notFound = false;
    this.subscription.add(
      this.modelService.all(this.formSearch.value, reload).subscribe(data => {
        this.submitted = false;
        this.ordenes = data.data;
        this.notFound = true;
        this.loading = false;
      })
    );
  }

  pagination(event) {
    this.modelService.page.setValues((event.pageIndex + 1), event.length, event.pageSize);
    this.list(true);
  }

}
