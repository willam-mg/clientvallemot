import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/login/login.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  idUser: any;
  user: User;
  submitted:boolean;

  constructor(
    private route: ActivatedRoute,
    private loginService: LoginService,
    private userService: UserService,
    public dialog: MatDialog,
    private router: Router,
    private _snackBar: MatSnackBar,
    public location:Location) {
    this.submitted = false;
  }

  openSnackBar(message: string, action: string) {
    return this._snackBar.open(message, action, {
      duration: 10000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  ngOnInit() {
    this.user = this.loginService.getUser();
  }

  goBack(){
    this.location.back();
  }

  updatePlayerId(){
    if (this.loginService.hasPlayerId()) {
      this.submitted = true;
      this.loginService.sendPlayerIdUser().subscribe((data) => {
        this.submitted = false;
        this.router.navigate(['/']);
      });
    }
  }

}
