import { AfterViewInit, AfterContentInit, Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { LoginService } from 'src/app/login/login.service';
import { User } from 'src/app/models/user';
import { Title } from '@angular/platform-browser';
import { NavigationService } from 'src/app/shared/services/navigation.service';
import { LoadingService } from 'src/app/loading/loading.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {
  userData: User;
  showSearch: boolean;
  constructor(
    public readonly router: Router,
    public deviceService: DeviceDetectorService,
    public loadingService: LoadingService,
    private loginService: LoginService,
    public title: Title,
    private navigationService: NavigationService) {
    this.userData = new User();
    this.showSearch = false;
  }
  
  ngOnInit() {
    this.userData = this.loginService.getUser()
  }

  onLoggedout() {
    this.loginService.logOut();
    this.router.navigate(['/login']);
  }

  back() {
    this.navigationService.back();
  }
}
