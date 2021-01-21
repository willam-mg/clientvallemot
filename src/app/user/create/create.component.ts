import { Component, OnDestroy, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { NavigationService } from 'src/app/shared/services/navigation.service';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit, OnDestroy {
  user: User;
  submitted: boolean;
  formUser: FormGroup;
  passwordIcon: string;
  passwordConfirmationIcon: string;
  subscription: Subscription;

  constructor(
    private userService: UserService,
    private router: Router,
    private title: Title,
    private navigationService: NavigationService) {
    this.navigationService.setBack('/users');
    this.title.setTitle('Nuevo administrador');
    this.submitted = false;
    this.passwordIcon = 'visibility';
    this.passwordConfirmationIcon = 'visibility';
    this.user = new User();
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
      password_confirmation: new FormControl(this.user.password_confirmation, [
        Validators.required
      ]),
    });
    this.subscription = new Subscription();
  }

  ngOnInit() {
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onFileChange(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = ( e: any ) => {
        this.user.foto = e.target.result;
        this.formUser.patchValue({
          foto: reader.result
        });
      };
    }
  }

  onSubmit() {
    try {
      if (this.formUser.invalid) {
        throw new Error('Entrada de datos invalido');
      }
      this.submitted = true;
      this.subscription.add(
        this.userService.register(this.formUser.value)
        .pipe(
          finalize(() => {
            this.submitted = false;
          })
        )
        .subscribe(async data => {
          this.user = data;
          this.getUsuarios();
        })
      );
    } catch (error) {
      console.log(error);
    }
  }

  getUsuarios() {
    this.subscription.add(
      this.userService.getUsuarios(null, true).subscribe(() => {
        console.log('ingresando a test');
        
        this.submitted = false;
        this.router.navigate(['/users/show'], {
          queryParams:
          {
            id: this.user.id
          }
        });
      })
    );
  }

  showPassword(input, confirm = false) {
    if (input.type === 'password') {
      input.type = 'text';
      if (!confirm) {
        this.passwordIcon = 'visibility_off';
      } else {
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
