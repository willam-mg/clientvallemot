import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AlertComponent } from './alert/alert.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  declarations: [
    PageNotFoundComponent,
    AlertComponent
  ],
  imports: [
    CommonModule, 
    RouterModule, 
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatProgressBarModule
  ],
  exports: [
    AlertComponent
    // CommonModule,
    // PageNotFoundComponent,
  ],
  entryComponents: [
    AlertComponent
  ]
  // entryComponents:[
  //   PageNotFoundComponent
  // ]
})
export class SharedModule { }
