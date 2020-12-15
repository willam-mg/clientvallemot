import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user.service';
import { User } from 'src/app/models/user';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from 'src/app/data.service';
import { LoginService } from 'src/app/login/login.service';
import { NavigationService } from 'src/app/shared/services/navigation.service';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  user: User;
  idUser: number;
  submitted: boolean;
  formUser: FormGroup;
  userData: User;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private dataService: DataService,
    private router: Router,
    private loginService: LoginService,
    private navigationService: NavigationService,
    private title: Title) {
    this.userData = this.loginService.getUser();
  }

  ngOnInit() {
    this.user = new User();
    this.route.queryParams.subscribe(params => {
      this.idUser = params.id;
      this.title.setTitle('Modificar usuario '+this.idUser);
      if (this.userData.type == 1){
        this.navigationService.setBack('/users/show', this.idUser);
      }else{
        this.navigationService.setBack('/users/profile');
      }
      this.loadUser();
    });
    
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

  loadUser() {
    this.userService.getUser(this.idUser).subscribe(data => {
      this.user = data;
      this.formUser.setValue({
        nombre_completo: this.user.nombre_completo,
        email: this.user.email,
        foto: null,
      });
    });
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
      if (this.formUser.invalid) {
        throw "Entrada de datos invalido";
      }
      this.submitted = true;

      this.userService.update(this.user.id, this.formUser.value).subscribe(async data => {
        this.user = data;
        if (this.loginService.getUser().id == this.user.id){
          this.loginService.setFotoUser(this.user.foto);
        }
        this.userService.getUsuarios(null, true).subscribe((data) => {
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
        let errMessage = this.dataService.errorErrors ? this.dataService.getStringErrors() : this.dataService.errorMessage;
        alert(errMessage);
      });
    } catch (error) {
      console.log(error);
    }
  }

}
