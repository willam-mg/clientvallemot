import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { Orden } from 'src/app/models/orden';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { OrdenService } from '../orden.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {

  id: any;
  model: Orden;

  constructor(
    private route: ActivatedRoute,
    private modelService: OrdenService,
    public dialog: MatDialog,
    private router: Router,
    private dataService: DataService) {
  }

  ngOnInit() {
    this.model = new Orden;
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
      if (!this.id) {
        this.router.navigate(['/ordenes']);
      }
    });
    this.model = this.modelService.getLocalItem(this.id);
    this.loadData();
  }

  loadData() {
    this.modelService.show(this.id).subscribe(data => {
      console.log(data);
      this.model = data;
    });
  }

  elminar() {
    this.dialog.open(AlertComponent, {
      width: '250px',
      data: {
        'confirm': true,
        'message': 'Esta seguro de eliminar este registro ?',
        'title': 'eliminar',
      }
    }).afterClosed().subscribe(res => {
      if (res) {
        this.modelService.delete(this.model.id).subscribe(data => {
          this.dataService.openSnackBar(data.message, 'Deshacer').onAction().subscribe(() => {
            this.modelService.restore(data.id).subscribe(data => {
              this.dataService.openSnackBar(data.message, 'cerrar');
              this.router.navigate(['/ordenes/show'], {
                queryParams:
                {
                  id: data.id
                }
              });
            });
          });
          this.router.navigate(['/ordenes']);

        });
      }
    });
  }


  printOrden() {
    this.modelService.printInWindow('reporte');
  }

}
