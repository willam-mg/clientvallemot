import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';
import { User } from 'src/app/models/user';
import { MatDialog} from '@angular/material/dialog';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {
  idUser: any;
  user: User;
  constructor(
    private route: ActivatedRoute, 
    private userService: UserService, 
    public dialog: MatDialog, 
    private router:Router,
    private _snackBar: MatSnackBar) { 
    
  }

  openSnackBar(message: string, action: string) {
    return this._snackBar.open(message, action, {
      duration: 10000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  ngOnInit() {
    this.user = new User;
    this.route.queryParams.subscribe(params => {
      this.idUser = params['id'];
    });
    this.user = this.userService.getLocalUser(this.idUser);
    this.loadUser();
  }

  loadUser(){
    this.userService.getUser(this.idUser).subscribe(data=>{
      this.user = data;
    });
  }

  elminar(){
    this.dialog.open(AlertComponent, {
      width: '250px',
      data: {
        'confirm': true,
        'message': 'Eliminar usuario ?',
        'title': 'eliminar',
      }
    }).afterClosed().subscribe(result => {
      if (result){
        this.userService.delete(this.user.id).subscribe(data=>{
          this.openSnackBar(data.message, 'Deshacer').onAction().subscribe(() => {
            this.userService.restore(data.id).subscribe(data => {
              this.openSnackBar(data.message, 'cerrar');
              this.router.navigate(['/users/show'], {
                queryParams:
                {
                  id: data.id
                }
              });
            });
          });
          this.router.navigate(['/users']);
    
        });
      }
    });
  }

}
