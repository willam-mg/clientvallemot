import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { DetalleRepuesto } from 'src/app/models/detalle-repuesto';
import { Orden } from 'src/app/models/orden';
import { Repuesto } from 'src/app/models/repuesto';
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
  repuestos: Array<DetalleRepuesto>;
  totalRepuestos: number;

  constructor(private route: ActivatedRoute,
              private modelService: OrdenService,
              public dialog: MatDialog,
              private router: Router,
              private dataService: DataService,
              private title: Title) {
      this.repuestos = [];
      this.totalRepuestos = 0;
  }

  ngOnInit() {
    this.model = new Orden;
    this.route.queryParams.subscribe(params => {
      this.id = params.id;
      if (!this.id) {
        this.router.navigate(['/ordenes']);
      }
    });
    this.title.setTitle('Orden ' + this.id);
    this.model = this.modelService.getLocalItem(this.id);
    this.loadData();
  }

  loadData() {
    this.modelService.show(this.id).subscribe(data => {
      console.log(data);
      this.model = data;
      this.repuestos = this.model.repuestos;
      this.repuestos.forEach(element => {
        this.totalRepuestos += element.precio;
      });
    });
  }

  elminar() {
    this.dialog.open(AlertComponent, {
      width: '250px',
      data: {
        confirm: true,
        message: 'Esta seguro de eliminar este registro ?',
        title: 'eliminar',
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

          this.modelService.all(null, true).subscribe(() => {
            this.router.navigate(['/ordenes']);
          });
        });
      }
    });
  }


  printOrden() {
    this.modelService.printInWindow('reporte');
  }
  printOrdenSalida() {
    this.modelService.printInWindow('reporte2');
  }

}
