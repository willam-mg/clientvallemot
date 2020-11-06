import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/login/login.service';
import { DataService } from 'src/app/data.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  user: User;
  submitted: boolean;
  formUser: FormGroup;
  
  constructor(
    private userService: UserService,
    private loginService: LoginService,
    private dataService: DataService,
    public location:Location,
    private router: Router) {
    this.submitted = false;
  }

  ngOnInit() {
    this.user = this.loginService.getUser();
    this.formUser = new FormGroup({
      password: new FormControl('', [
        Validators.required,
      ]),
      password_nuevo: new FormControl('', [
        Validators.required,
      ]),
      password_nuevo_confirmation: new FormControl('', [
        Validators.required
      ]),
    });
  }

  onSubmit() {
    try {
      if (this.formUser.invalid) {
        throw "Entrada de datos invalido";
      }
      this.submitted = true;

      this.userService.changePassword(this.user.id, this.formUser.value).subscribe(async data => {
        this.submitted = false;
        this.dataService.openSnackBar(data, 'Cerrar');
        this.router.navigate(['/users/profile'], {
          queryParams:
          {
            id: this.user.id
          }
        });
      }, err => {
        this.submitted = false;
      });
    } catch (error) {
      console.log(error);
    }
  }

  showPassword(input, confirm = false) {
    if (input.type == 'password') {
      input.type = 'text';
    } else {
      input.type = 'password';
    }
  }

  goBack() {
    this.location.back();
  }

}
