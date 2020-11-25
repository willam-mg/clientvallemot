import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './core/auth.guard';
import { AuthenticatedGuard } from './core/authenticated.guard';
import { PageNotFoundComponent } from './shared/page-not-found/page-not-found.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { LoginLayoutComponent } from './layout/login-layout/login-layout.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'users',
    component: MainLayoutComponent,
    loadChildren: () => import('./user/user.module').then(m => m.UserModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'mecanicos',
    component: MainLayoutComponent,
    loadChildren: () => import('./mecanico/mecanico.module').then(m => m.MecanicoModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'ordenes',
    component: MainLayoutComponent,
    loadChildren: () => import('./orden/orden.module').then(m => m.OrdenModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'repuestos',
    component: MainLayoutComponent,
    loadChildren: () => import('./repuesto/repuesto.module').then(m => m.RepuestoModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'accesorios',
    component: MainLayoutComponent,
    loadChildren: () => import('./accesorio/accesorio.module').then(m => m.AccesorioModule),
    canActivate: [AuthGuard]
  },
  // {
  //   path: 'medicamentos',
  //   component: MainLayoutComponent,
  //   loadChildren: () => import('./medicamento/medicamento.module').then(m => m.MedicamentoModule),
  //   canActivate: [AuthGuard]
  // },
  // {
  //   path: 'medicos',
  //   component: MainLayoutComponent,
  //   loadChildren: () => import('./medico/medico.module').then(m => m.MedicoModule),
  //   canActivate: [AuthGuard]
  // },
  // {
  //   path: 'compras',
  //   component: MainLayoutComponent,
  //   loadChildren: () => import('./compra/compra.module').then(m => m.CompraModule),
  //   canActivate: [AuthGuard]
  // },
  {
    path: 'login',
    component: LoginLayoutComponent,
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
    canActivate: [AuthenticatedGuard]
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
})
export class AppRoutingModule { }
