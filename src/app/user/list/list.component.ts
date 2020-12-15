import { Component, OnInit, ViewChild } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from '../user.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { NavigationService } from 'src/app/shared/services/navigation.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  usuarios: Array<User>;
  submitted:boolean;
  displayedColumns: string[] = [
    // 'nro',
    'foto',
    'nombre_completo',
    'email',
    'actions',
  ];
  filterSearch: User;
  formSearch: FormGroup;
  showSearch:boolean;

  constructor(
    public userService: UserService,
    private title: Title,
    private navigationService: NavigationService) {
    this.navigationService.setBack('/'); 
    this.title.setTitle('Administradores');
    this.filterSearch = new User();
    this.formSearch = new FormGroup({
      nombre_completo: new FormControl(this.filterSearch.nombre_completo, []),
      email: new FormControl(this.filterSearch.email, []),
    });
    this.submitted = false;
    this.showSearch= false;
  }
  
  ngOnInit() {
    this.getUsuarios();
  }

  getUsuarios(load = false) {
    this.submitted = true;
    this.userService.getUsuarios(this.formSearch.value, load).subscribe(data => {
      this.submitted = false;
      this.usuarios = data.data;
    });
  }

  pagination(event){
    this.userService.page.setValues((event.pageIndex+1), event.length, event.pageSize);
    this.getUsuarios(true);
  }

}
