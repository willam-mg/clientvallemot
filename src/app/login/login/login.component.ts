import { Component, OnInit } from '@angular/core';
import { LoginService } from "../login.service";
import { User } from "../../models/user";
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
// import { HttpEventType } from '@angular/common/http';
import { DataService } from 'src/app/data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { async } from '@angular/core/testing';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user:User;
  formLogin:FormGroup;
  submitted: boolean;
  passwordIcon:string;
  
  constructor(
    private loginService: LoginService, 
    private router:Router) { 
    
    this.submitted = false;
    this.passwordIcon = 'visibility';
    this.user = new User;

    this.formLogin = new FormGroup({
      email: new FormControl(this.user.email, {
        // updateOn: 'blur',
        validators: [
          Validators.required,
          Validators.email,
        ]
      }),
      foto: new FormControl(null),
      password: new FormControl(this.user.password, {
        // updateOn: 'blur',
        validators: [
          Validators.required,
        ]
      }),
    });
  }

  ngOnInit() {
  }

  login(){
    try {
      if (this.formLogin.invalid){
        throw "Email o password incorrecto";
      }
      this.submitted = true;
      this.loginService.login(this.formLogin.value).subscribe(async data => {
        localStorage.setItem(environment.store.userId, data.id)
        localStorage.setItem(environment.store.userToken, data.accessToken)
        localStorage.setItem(environment.store.userData, JSON.stringify(data))
        if (this.loginService.hasPlayerId()){
          this.loginService.sendPlayerIdUser().subscribe((data)=>{
            this.submitted = false;
            this.router.navigate(['/']);
          });
        }else{
          this.submitted = false;
          this.router.navigate(['/']);
        }
      }
      , err => {
        this.submitted = false;
      }
      );
    } catch (err) {
      this.submitted = false;

    }
  }

  showPassword(input){
    if (input.type == 'password'){
      input.type = 'text';
      this.passwordIcon = 'visibility_off';
    }else{
      input.type = 'password';
      this.passwordIcon = 'visibility';
    }
  }

}
