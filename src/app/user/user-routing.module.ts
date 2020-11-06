import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { CreateComponent } from './create/create.component';
import { ListComponent } from './list/list.component';
import { ShowComponent } from './show/show.component';
import { EditComponent } from './edit/edit.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { ProfileComponent } from './profile/profile.component';


// const routes: Routes = [
//   {
//     path: '',
//     component: UserComponent
//   },
//   {
//     path: '/create',
//     component: CreateComponent
//   }
// ];


const routes: Routes = [
  {
    path: '',
    // component: HomeComponent,
    component: UserComponent,
    children: [
      {
        path: '',
        // redirectTo: 'list'
        component: ListComponent

      },
      {
        path: 'create',
        component: CreateComponent
      },
      {
        path: 'show',
        component: ShowComponent
      },
      {
        path: 'edit',
        component: EditComponent
      },
      {
        path: 'change-password',
        component: ChangePasswordComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      // {
      //   path: 'view',
      //   component: ViewComponent
      // },
      // {
      //   path: 'create',
      //   component: CreateComponent
      // },
      // {
      //   path: 'update',
      //   component: UpdateComponent
      // },
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
