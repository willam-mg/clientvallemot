import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccesorioRoutingModule } from './accesorio-routing.module';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { ShowComponent } from './show/show.component';
import { ListComponent } from './list/list.component';
import { MainComponent } from './main/main.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule, MatToolbarModule, MatSidenavModule, MatListModule, MatIconModule, MatButtonModule, MatMenuModule, MatInputModule, MatFormFieldModule, MatTableModule, MatPaginatorModule, MatSnackBarModule, MatTooltipModule, MatDatepickerModule, MatNativeDateModule } from '@angular/material';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [CreateComponent, EditComponent, ShowComponent, ListComponent, MainComponent],
  imports: [
    CommonModule,
    AccesorioRoutingModule,
    MatCardModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    RouterModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatTableModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatSnackBarModule,
    MatTooltipModule,
    MatDatepickerModule,
    MatNativeDateModule
  ]
})
export class AccesorioModule { }
