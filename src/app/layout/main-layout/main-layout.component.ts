import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { LoginService } from 'src/app/login/login.service';
import { User } from 'src/app/models/user';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {
  userData: User;
  constructor(public readonly router: Router,
              public dataService: DataService, 
              public deviceService: DeviceDetectorService,
              private loginService: LoginService,
              public title: Title) {
    this.userData = new User();
    this.userData = loginService.getUser();
  }

  ngOnInit() {
  }

  // ngAfterViewInit(): void {
  //   //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
  //   //Add 'implements AfterViewInit' to the class.
  //   this.dataService.isLoading = true;
  // }

  onLoggedout() {
    this.loginService.logOut();
    this.router.navigate(['/login']);
  }

}
