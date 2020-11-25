import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { LoginService } from 'src/app/login/login.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  userData: User;
  constructor(private title: Title,
              private loginService: LoginService) { 
    this.title.setTitle(`Valle motor's`);
    this.userData = new User();
    this.userData = loginService.getUser();
  }

  ngOnInit() {
  }

}
