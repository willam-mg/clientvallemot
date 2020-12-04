import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { AccesorioService } from 'src/app/accesorio/accesorio.service';
import { DataService } from 'src/app/data.service';
import { Accesorio } from 'src/app/models/accesorio';
import { DetalleRepuesto } from 'src/app/models/detalle-repuesto';
import { Orden } from 'src/app/models/orden';
import { Repuesto } from 'src/app/models/repuesto';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { NavigationService } from 'src/app/shared/services/navigation.service';
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
  accesorios: Array<Accesorio>;

  constructor(
    private route: ActivatedRoute,
    private modelService: OrdenService,
    public dialog: MatDialog,
    private router: Router,
    private dataService: DataService,
    private title: Title,
    private navigationService: NavigationService,
    private accesoriosService: AccesorioService) {
    this.navigationService.setBack('/ordenes');
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
      // accesorios
      this.accesoriosService.todos().subscribe( (dataAccesorios) => {
        this.accesorios = dataAccesorios.map(element => {
          const ez = this.model.estadoVehiculo.some(item => {
            return item.accesorio_id == element.id;
          });
          return {
            id: element.id,
            nombre: element.nombre,
            checked: ez,
          };
        });
      });

      // calcular el total de repuestos
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
            this.modelService.restore(data.id).subscribe(data1 => {
              this.dataService.openSnackBar(data1.message, 'cerrar');
              this.router.navigate(['/ordenes/show'], {
                queryParams:
                {
                  id: data1.id
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
