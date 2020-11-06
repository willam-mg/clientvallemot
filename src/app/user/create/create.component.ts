import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
// import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  user:User;
  submitted: boolean;
  formUser:FormGroup;
  passwordIcon: string;
  passwordConfirmationIcon: string;

  constructor(
    private userService: UserService, 
    private router: Router) {
    this.submitted = false;
    this.passwordIcon = 'visibility';
    this.passwordConfirmationIcon = 'visibility';
    
    this.user = new User;
    this.formUser = new FormGroup({
      nombre_completo: new FormControl(this.user.nombre_completo, [
        Validators.required,
        Validators.maxLength(50)
      ]),
      email: new FormControl(this.user.email, [
        Validators.required,
        Validators.email
      ]),
      foto: new FormControl(null),
      password: new FormControl(this.user.password, [
        Validators.required,
      ]),
      password_confirmation: new FormControl(this.user.password_confirmation,[
        Validators.required
      ]),
    });
  }

  ngOnInit() {
  }

  onFileChange(event) {
    let reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = (e:any) => {
        this.user.foto = e.target.result;
        this.formUser.patchValue({
          foto: reader.result
        });
      };
    }
  }

  onSubmit() {
    try {
      if (this.formUser.invalid){
        throw "Entrada de datos invalido";
      }
      this.submitted = true;

      this.userService.register(this.formUser.value).subscribe(async data => {
        this.user = data;
        this.userService.getUsuarios(null, true).subscribe((data)=>{
          this.submitted = false;
          this.router.navigate(['/users/show'], {
            queryParams:
            {
              id: this.user.id
            }
          });
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
      if (!confirm){
        this.passwordIcon = 'visibility_off';
      }else{
        this.passwordConfirmationIcon = 'visibility_off';
      }
    } else {
      input.type = 'password';
      if (!confirm) {
        this.passwordIcon = 'visibility';
      } else {
        this.passwordConfirmationIcon = 'visibility';
      }
    }
  }

}
