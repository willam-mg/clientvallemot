import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { User } from 'src/app/models/user';
import { MatDialog} from '@angular/material/dialog';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { NavigationService } from 'src/app/shared/services/navigation.service';
import { Title } from '@angular/platform-browser';
import { LoginService } from 'src/app/login/login.service';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {
  idUser: number;
  user: User;
  userData: User;
  subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    public dialog: MatDialog,
    private router: Router,
    private snackBar: MatSnackBar,
    private navigationService: NavigationService,
    private loginService: LoginService,
    private title: Title) {
    this.user = new User();
    this.navigationService.setBack('/users');
    this.userData = this.loginService.getUser();
    this.subscription = new Subscription();
  }

  ngOnInit() {
    this.subscription.add(
      this.route.queryParams.subscribe(params => {
        this.idUser = params.id;
        this.title.setTitle('Usuario ' + this.idUser);
        this.loadUser();
      })
    );
  }

  openSnackBar(message: string, action: string) {
    return this.snackBar.open(message, action, {
      duration: 10000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }


  loadUser() {
    this.subscription.add(
      this.userService.getUser(this.idUser).subscribe(data => {
        this.user = data;
      })
    );
  }

  elminar() {
    this.dialog.open(AlertComponent, {
      width: '250px',
      data: {
        confirm: true,
        message: 'Eliminar usuario ?',
        title: 'eliminar',
      }
    }).afterClosed().subscribe(result => {
      if (result) {
        this.userService.delete(this.user.id).subscribe(() => {
          this.router.navigate(['/users']);
        });
      }
    });
  }

}
