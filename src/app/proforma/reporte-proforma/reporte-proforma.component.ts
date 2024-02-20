import { Component, Input, OnInit } from '@angular/core';
import { Accesorio } from 'src/app/models/accesorio';
import { Orden } from 'src/app/models/orden';

@Component({
  selector: 'app-reporte-proforma',
  templateUrl: './reporte-proforma.component.html',
  styleUrls: ['./reporte-proforma.component.css']
})
export class ReporteProformaComponent implements OnInit {
  @Input() model: Orden;
  @Input() groupAccesorios: Array<Array<Accesorio>>;
  constructor() { 
    this.groupAccesorios = [];
    this.model = new Orden();
  }

  ngOnInit() {
  }

}
