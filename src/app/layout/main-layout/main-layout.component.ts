import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { DeviceDetectorService } from 'ngx-device-detector';
import { LoginService } from 'src/app/login/login.service';
import { User } from 'src/app/models/user';
import { Title } from '@angular/platform-browser';
import { Location } from '@angular/common';
import { NavigationService } from 'src/app/shared/services/navigation.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {
  userData: User;
  showSearch: boolean;
  loading: boolean;
  constructor(
    public readonly router: Router,
    public dataService: DataService,
    public deviceService: DeviceDetectorService,
    private loginService: LoginService,
    public title: Title,
    private navigationService: NavigationService) {
    this.userData = new User();
    this.userData = loginService.getUser();
    this.showSearch = false;
  }

  ngOnInit() {
    this.loading = true;
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

  back(): void {
    // this.router.navigate("..");
    // this.location.back();
    this.navigationService.back();
  }

}
