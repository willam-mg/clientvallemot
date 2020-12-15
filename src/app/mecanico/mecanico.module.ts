import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MecanicoRoutingModule } from './mecanico-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule, MatToolbarModule, MatSidenavModule, MatListModule, MatIconModule, MatButtonModule, MatMenuModule, MatInputModule, MatFormFieldModule, MatTableModule, MatPaginatorModule, MatSnackBarModule, MatTooltipModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { MainComponent } from './main/main.component';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { ShowComponent } from './show/show.component';
import { EditComponent } from './edit/edit.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';


@NgModule({
  declarations: [MainComponent, ListComponent, CreateComponent, ShowComponent, EditComponent],
  imports: [
    CommonModule,
    MecanicoRoutingModule,
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
    MatNativeDateModule,
    MatAutocompleteModule
  ]
})
export class MecanicoModule { }
