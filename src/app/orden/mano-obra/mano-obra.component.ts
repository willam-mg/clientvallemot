import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { DetalleManoObra } from 'src/app/models/detalle-mano-obra';
import { Orden } from 'src/app/models/orden';
import { OrdenService } from '../orden.service';

@Component({
  selector: 'app-mano-obra',
  templateUrl: './mano-obra.component.html',
  styleUrls: ['./mano-obra.component.css']
})
export class ManoObraComponent implements OnInit {
  id: any;
  model: Orden;
  submitted: boolean;
  repuestoSelctd: string;
  // repuestos: Array<Repuesto>;
  descripcion: string;
  precio: number;
  detalleManoObra: Array<DetalleManoObra>;
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
    private router: Router,
    private title: Title) {
    this.formModel = new FormGroup({
      detalle: new FormControl(),
      precio: new FormControl(),
    });
    // this.repuestoSelctd = new Repuesto();
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
    // this.repuestos = [];
    this.title.setTitle('Mano de obra para ' + this.id);
    this.detalleManoObra = [];
    this.model = this.modelService.getLocalItem(this.id);
    this.loadData();
  }

  loadData() {
    this.modelService.show(this.id).subscribe(data => {
      this.model = data;
      // this.loadRepuestos();
    });
  }

  // loadRepuestos() {
  //   this.modelService.listRepuestos().subscribe(data => {
  //     // this.repuestos = data.data;
  //   });
  // }

  deleteRow() { }

  agregarDetalle() {
    try {
      const existsone = this.detalleManoObra.some(element => element.descripcion === this.descripcion);
      const existstwo = this.model.manosobra.some(element => element.descripcion === this.descripcion);
      if (existsone || existstwo) {
        throw new Error('el elemento ya existe');
      }
      // this.repuestoSelctd = this.repuestos.find(element => element.id === this.descripcion);
      const objdetalle = new DetalleManoObra();
      objdetalle.descripcion = this.descripcion;
      objdetalle.precio = this.precio;
      this.detalleManoObra.push(objdetalle);
      this.model.manosobra.push(objdetalle);
      console.log(this.detalleManoObra);
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
        detalle: this.detalleManoObra,
      };
      this.modelService.addManoObra(sendBody).subscribe(async () => {
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
