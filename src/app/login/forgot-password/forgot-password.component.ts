import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  user: User;
  formLogin: FormGroup;
  submitted: boolean;
  passwordIcon: string;
  
  constructor(
    private loginService: LoginService,
    private router: Router,
    private dataService: DataService) {

    this.submitted = false;
    this.passwordIcon = 'visibility';
    this.user = new User;

    this.formLogin = new FormGroup({
      email: new FormControl(this.user.email, {
        validators: [
          Validators.required,
          Validators.email,
        ]
      }),
    });
  }

  ngOnInit() {
  }

  sendMail() {
    try {
      if (this.formLogin.invalid) {
        throw "Email o password incorrecto";
      }
      this.submitted = true;
      this.loginService.sendMail(this.formLogin.value.email).subscribe(async data => {
        this.dataService.openSnackBar('Revise su bandeja de entrada de su correo electronico', 'Cerrar');
        this.submitted = false;
        this.router.navigate(['/login']);
        
      }, err => {
          this.submitted = false;
        }
      );
    } catch (err) {
      console.log(err);
    }
  }

}
