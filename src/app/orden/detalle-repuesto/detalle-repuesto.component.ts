import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { DetalleRepuesto } from 'src/app/models/detalle-repuesto';
import { Orden } from 'src/app/models/orden';
import { Repuesto } from 'src/app/models/repuesto';
// import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { OrdenService } from '../orden.service';

@Component({
  selector: 'app-detalle-repuesto',
  templateUrl: './detalle-repuesto.component.html',
  styleUrls: ['./detalle-repuesto.component.css']
})
export class DetalleRepuestoComponent implements OnInit {

  id: any;
  model: Orden;
  submitted: boolean;
  repuestoSelctd: Repuesto;
  repuestos: Array<Repuesto>;
  repuestoId: number;
  detalleRepuestos: Array<DetalleRepuesto>;
  formModel: FormGroup;
  displayedColumns: string[] = [
    'nombre',
    'precio',
    'actions',
  ];

  constructor(
    private route: ActivatedRoute,
    private modelService: OrdenService,
    public dialog: MatDialog,
    private router: Router) {
    this.formModel = new FormGroup({
      detalle: new FormControl(),
    });
    this.repuestoSelctd = new Repuesto();
    this.submitted = false;
  }

  ngOnInit() {
    this.model = new Orden();
    this.route.queryParams.subscribe(params => {
      this.id = params.id;
      if (!this.id) {
        this.router.navigate(['/ordenes']);
      }
    });
    this.repuestos = [];
    this.detalleRepuestos = [];
    this.model = this.modelService.getLocalItem(this.id);
    this.loadData();
  }

  loadData() {
    this.modelService.show(this.id).subscribe(data => {
      this.model = data;
      this.loadRepuestos();
    });
  }

  loadRepuestos() {
    this.modelService.listRepuestos().subscribe(data => {
      this.repuestos = data.data;
    });

  }

  deleteRow(){}

  agregarDetalle(){
    try {
      const existsone = this.detalleRepuestos.some(element => element.repuesto_id === this.repuestoId);
      const existstwo = this.model.repuestos.some(element => element.repuesto_id === this.repuestoId);
      if ( existsone || existstwo ){
        throw new Error('el elemento ya existe');
      }
      this.repuestoSelctd = this.repuestos.find(element => element.id === this.repuestoId);
      const objdetalle = new DetalleRepuesto();
      objdetalle.repuesto_id = this.repuestoSelctd.id;
      objdetalle.repuesto = this.repuestoSelctd;

      this.detalleRepuestos.push(objdetalle);
      this.model.repuestos.push(objdetalle);
      console.log(this.detalleRepuestos);
    } catch (error) {
      console.log(error);
    }
  }

  onSubmit() {
    try {
      if (this.formModel.invalid) {
        throw new Error('Entrada de datos invalido');
      }
      this.submitted = true;
      const sendBody = {
        solicitud_trabajo_id: this.model.id,
        detalle: this.detalleRepuestos,
      };
      this.modelService.detalleCreate(sendBody).subscribe(async () => {
        this.modelService.all(null, true).subscribe(() => {
          this.submitted = false;
          this.router.navigate(['/ordenes/show'], {
            queryParams:
            {
              id: this.model.id
            }
          });
        });
      }, () => {
        this.submitted = false;
      });
    } catch (error) {
      console.log(error);
    }
  }

}
