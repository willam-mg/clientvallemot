import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Observer, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { AccesorioService } from 'src/app/accesorio/accesorio.service';
import { DataService } from 'src/app/data.service';
import { LoginService } from 'src/app/login/login.service';
import { Accesorio } from 'src/app/models/accesorio';
import { DetalleRepuesto } from 'src/app/models/detalle-repuesto';
import { Orden } from 'src/app/models/orden';
import { Repuesto } from 'src/app/models/repuesto';
import { User } from 'src/app/models/user';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { NavigationService } from 'src/app/shared/services/navigation.service';
import { DetalleRepuestoComponent } from '../detalle-repuesto/detalle-repuesto.component';
import { ManoObraComponent } from '../mano-obra/mano-obra.component';
import { OrdenService } from '../orden.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit, OnDestroy {

  id: number;
  model: Orden;
  repuestos: Array<DetalleRepuesto>;
  totalRepuestos: number;
  totalManoObra: number;
  accesorios: Array<Accesorio>;
  groupAccesorios: Array<Array<Accesorio>>;
  userData: User;
  modelSubscribe: Subscription;
  subscription: Subscription;
  loading: boolean;
  showImage: boolean;

  constructor(
    private route: ActivatedRoute,
    private modelService: OrdenService,
    public dialog: MatDialog,
    private router: Router,
    private dataService: DataService,
    private title: Title,
    private navigationService: NavigationService,
    private accesoriosService: AccesorioService,
    private loginService: LoginService) {
    this.navigationService.setBack('/ordenes');
    this.repuestos = [];
    this.totalRepuestos = 0;
    this.totalManoObra = 0;
    this.groupAccesorios = [];
    this.userData = this.loginService.getUser();
    this.model = new Orden();
    this.model.foto = '/assets/img/no-image-user.svg';
    this.subscription = new Subscription();
    this.loading = false;
    this.showImage = true;
  }

  ngOnInit() {
    this.loading = true;
    this.subscription.add(
      this.route.queryParams.subscribe(params => {
        this.title.setTitle('Orden ' + params.id);
        this.loadData(params.id);
      })
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  loadData(id) {
    this.subscription.add(
      this.modelService.show(id).subscribe(response => {
        this.model = response;
        this.getAccesorios();
      })
    );
  }


  getAccesorios() {
    this.subscription.add(
      this.accesoriosService.todos()
      .pipe(
        map( (res: Array<Accesorio>) =>
          res.map( data => {
            return {
              id: data.id,
              nombre: data.nombre,
              checked: this.model.estadoVehiculo.some(item => item.accesorio_id == data.id)
            };
          })
        )
      )
      .subscribe((dataAccesorios) => {
        this.groupAccesorios = [];
        this.accesorios = dataAccesorios;
        if (this.accesorios.length >= 14 ) {
          this.groupAccesorios.push( this.accesorios.slice(0, 3) );
          this.groupAccesorios.push( this.accesorios.slice(4, 7) );
          this.groupAccesorios.push( this.accesorios.slice(8, 11) );
          this.groupAccesorios.push( this.accesorios.slice(12, this.accesorios.length) );
        }
        this.loading = false;
      })
    );
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

  addManoObra(myManoObra = 0, idUpdate = false) {
    this.dialog.open(ManoObraComponent, {
      data: {
        model: this.model,
        userData: this.userData,
        isUpdate: idUpdate,
        manoObra: myManoObra
      },
      disableClose: true
    }).afterClosed().subscribe(res => {
      if (res) {
        this.loadData(this.model.id);
      }
    });
  }

  addRepuesto(myRepuesto = 0, idUpdate = false) {
    this.dialog.open(DetalleRepuestoComponent, {
      data: {
        model: this.model,
        userData: this.userData,
        isUpdate: idUpdate,
        repuesto: myRepuesto,
      },
      disableClose: false
    }).afterClosed().subscribe(res => {
      if (res) {
        this.loadData(this.model.id);
      }
    });
  }
}
