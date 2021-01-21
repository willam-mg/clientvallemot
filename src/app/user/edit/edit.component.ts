import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { User } from 'src/app/models/user';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginService } from 'src/app/login/login.service';
import { NavigationService } from 'src/app/shared/services/navigation.service';
import { Title } from '@angular/platform-browser';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit, OnDestroy {
  user: User;
  idUser: number;
  submitted: boolean;
  formUser: FormGroup;
  userData: User;
  subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router,
    private loginService: LoginService,
    private navigationService: NavigationService,
    private title: Title) {
    this.user = new User();
    this.userData = this.loginService.getUser();
    this.subscription = new Subscription();
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
    });
  }

  ngOnInit() {
    this.subscription.add(
      this.route.queryParams.subscribe(params => {
        this.idUser = params.id;
        this.title.setTitle('Modificar usuario ' + this.idUser);
        if (this.userData.type === 1) {
          this.navigationService.setBack('/users/show', this.idUser);
        } else {
          this.navigationService.setBack('/users/profile');
        }
        this.loadUser();
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  loadUser() {
    this.subscription.add(
      this.userService.getUser(this.idUser).subscribe(data => {
        this.user = data;
        this.formUser.setValue({
          nombre_completo: this.user.nombre_completo,
          email: this.user.email,
          foto: null
        });
      })
    );
  }

  onFileChange(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
      reader.onload = (e: any) => {
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
        this.userService.update(this.user.id, this.formUser.value).subscribe(async data => {
          this.user = data;
          if (this.loginService.getUser().id === this.user.id) {
            this.loginService.setFotoUser(this.user.foto);
          }
          this.getAll();
        })
      );
    } catch (error) {
      console.log(error);
    }
  }

  getAll() {
    this.subscription.add(
      this.userService.getUsuarios(null, true).subscribe(() => {
        this.submitted = false;
        this.router.navigate(['/users/show'], {
          queryParams: {
            id: this.user.id
          }
        });
      })
    );
  }

}
