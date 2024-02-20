import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { DetalleRepuestoComponent } from './detalle-repuesto/detalle-repuesto.component';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';
import { MainComponent } from './main/main.component';
import { ManoObraComponent } from './mano-obra/mano-obra.component';
import { ShowComponent } from './show/show.component';



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
        path: 'detalle-create',
        component: DetalleRepuestoComponent
      },
      {
        path: 'manoobra-create',
        component: ManoObraComponent
      },
      {
        path: 'edit',
        component: EditComponent
      },
    ]
  }

];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdenRoutingModule { }
