import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdenRoutingModule } from './proforma-routing.module';
import { MainComponent } from './main/main.component';
import { CreateComponent } from './create/create.component';
import { ShowComponent } from './show/show.component';
import { ListComponent } from './list/list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule,
  MatToolbarModule,
  MatSidenavModule,
  MatListModule,
  MatIconModule,
  MatButtonModule,
  MatMenuModule,
  MatInputModule,
  MatFormFieldModule,
  MatTableModule,
  MatPaginatorModule,
  MatSnackBarModule,
  MatTooltipModule,
  MatDatepickerModule,
  MatNativeDateModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { MatStepperModule } from '@angular/material/stepper';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { DetalleRepuestoComponent } from './detalle-repuesto/detalle-repuesto.component';
import { ManoObraComponent } from './mano-obra/mano-obra.component';
import { EditComponent } from './edit/edit.component';
import { AccesoriosComponent } from './shared/accesorios/accesorios.component';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatDialogModule } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ReporteProformaComponent } from './reporte-proforma/reporte-proforma.component';
import { ReporteSalidaComponent } from './reporte-salida/reporte-salida.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@NgModule({
  declarations: [
    MainComponent,
    CreateComponent,
    ShowComponent,
    ListComponent,
    DetalleRepuestoComponent,
    ManoObraComponent,
    EditComponent,
    AccesoriosComponent,
    ReporteProformaComponent,
    ReporteSalidaComponent
  ],
  imports: [
    CommonModule,
    OrdenRoutingModule,
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
    MatStepperModule,
    MatCheckboxModule,
    MatSelectModule,
    MatBottomSheetModule,
    MatDialogModule,
    MatChipsModule,
    MatProgressBarModule,
    MatAutocompleteModule
  ],
  entryComponents: [
    AccesoriosComponent
  ]
})
export class ProformaModule { }
