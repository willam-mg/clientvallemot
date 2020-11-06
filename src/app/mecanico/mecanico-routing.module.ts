import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';
import { ShowComponent } from './show/show.component';
import { MainComponent } from './main/main.component';



const routes: Routes = [
  {
    path: '',
    component: MainComponent,
    children: [
      {
        path: '',
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
      // {
      //   path: 'change-password',
      //   component: ChangePasswordComponent
      // },
      // {
      //   path: 'profile',
      //   component: ProfileComponent
      // },
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
export class MecanicoRoutingModule { }
