import { Component, OnInit, AfterViewInit, AfterContentInit, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Observable, Observer, Subscription } from 'rxjs';
import { map, shareReplay, startWith, tap } from 'rxjs/operators';
import { LoginService } from 'src/app/login/login.service';
import { LaravelRequest } from 'src/app/models/laravel-request';
import { Orden } from 'src/app/models/orden';
import { User } from 'src/app/models/user';
import { Page } from 'src/app/shared/page';
import { NavigationService } from 'src/app/shared/services/navigation.service';
import { OrdenService } from '../orden.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  // changeDetection: ChangeDetectionStrategy.OnPush
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
  page: Page;
  listPropietario: Array<string>;
  listPlaca: Array<string>;
  listModelo: Array<string>;
  propietarioOptions: Observable<string[]>;
  placaOptions: Observable<string[]>;
  modeloOptions: Observable<string[]>;

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
    this.page = new Page();
  }

  ngOnInit() {
    this.listAll();
    this.list();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  initObserversAutoComplete() {
    this.propietarioOptions = this.formSearch.controls.propietario.valueChanges
      .pipe(
        startWith(''),
        map(value => this.myfilter(this.listPropietario, value))
      );
    this.placaOptions = this.formSearch.controls.placa.valueChanges
      .pipe(
        startWith(''),
        map(value => this.myfilter(this.listPlaca, String(value)))
      );
    this.modeloOptions = this.formSearch.controls.modelo.valueChanges
      .pipe(
        startWith(''),
        map(value => this.myfilter(this.listModelo, String(value)))
      );
  }

  private myfilter(list: Array<string>, value: string): string[] {
    const filterValue = value.toLowerCase();
    return list.filter(option => option.toLowerCase().includes(filterValue));
  }

  listAll() {
    this.submitted = true;
    this.loading = true;
    this.notFound = false;
    this.subscription.add(
      this.modelService.all(this.formSearch.value, false)
        .pipe(
          map((data: any) => {
            this.page.setValues(data.current_page, data.total, data.per_page);
            return data.data;
          }),
          shareReplay(1)
        ).subscribe(data => {
          this.listPropietario = data.map(x => x.propietario).filter((value, index, self) => {
            return self.indexOf(value) === index;
          });
          this.listPlaca = data.map(x => x.placa.toUpperCase()).filter((value, index, self) => {
            return self.indexOf(value) === index;
          });
          this.listModelo = data.map(x => x.modelo.toUpperCase()).filter((value, index, self) => {
            return self.indexOf(value) === index;
          });
          this.initObserversAutoComplete();
        })
    );
  }

  list(reload = false) {
    this.submitted = true;
    this.loading = true;
    this.notFound = false;
    this.subscription.add(
      this.modelService.all(this.formSearch.value, reload, this.page)
      .pipe(
        map((data: any) => {
          this.page.setValues(data.current_page, data.total, data.per_page);
          return data.data;
        }),
        shareReplay(1)
      ).subscribe(data => {
        this.ordenes = data;
        this.submitted = false;
        this.notFound = true;
        this.loading = false;
        this.showSearch = false;
      })
    );
  }

  pagination(event) {
    this.page.setValues((event.pageIndex + 1), event.length, event.pageSize);
    console.log('page in pagination', this.page);
    // this.modelService.page.setValues((event.pageIndex + 1), event.length, event.pageSize);
    this.list(true);
  }

}
