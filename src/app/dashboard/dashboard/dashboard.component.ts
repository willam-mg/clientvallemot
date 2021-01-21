import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { DeviceDetectorService } from 'ngx-device-detector';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { LoginService } from 'src/app/login/login.service';
import { Orden } from 'src/app/models/orden';
import { User } from 'src/app/models/user';
import { OrdenService } from 'src/app/orden/orden.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  userData: User;
  formSearch: FormGroup;
  model: Orden;
  notFound: boolean;
  ordenes: Array<Orden>;
  loading: boolean;
  subscription: Subscription;

  constructor(
    private title: Title,
    private formBuilder: FormBuilder,
    private loginService: LoginService,
    public deviceService: DeviceDetectorService,
    private modelService: OrdenService) {
    this.notFound = true;
    this.ordenes = [];
    this.title.setTitle(`Valle motor's`);
    this.userData = new User();
    this.userData = this.loginService.getUser();

    this.model = new Orden();
    this.model.estado = 0;
    this.formSearch = this.formBuilder.group({
      propietario: new FormControl(this.model.propietario),
      placa: new FormControl(this.model.placa),
      modelo: new FormControl(this.model.modelo),
      color: new FormControl(this.model.color),
      estado: new FormControl(this.model.estado),
    });
    this.loading = false;
    this.subscription = new Subscription();
  }

  ngOnInit() {
    this.list();
  }


  list(reload = false) {
    this.loading = true;
    this.notFound = false;
    this.subscription.add(
      this.modelService.all(this.formSearch.value, reload)
      .pipe(
        map( (data: any) => data.data)
      )
      .subscribe(data => {
        this.ordenes = data;
        this.notFound = true;
        this.loading = false;
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
