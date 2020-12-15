import { Component, Input, OnInit } from '@angular/core';
import { Accesorio } from 'src/app/models/accesorio';
import { Orden } from 'src/app/models/orden';

@Component({
  selector: 'app-reporte-entrada',
  templateUrl: './reporte-entrada.component.html',
  styleUrls: ['./reporte-entrada.component.css']
})
export class ReporteEntradaComponent implements OnInit {
  @Input() model: Orden;
  @Input() groupAccesorios: Array<Array<Accesorio>>;
  constructor() { 
    this.groupAccesorios = [];
    this.model = new Orden();
  }

  ngOnInit() {
  }

}
