import { Component, Input, OnInit } from '@angular/core';
import { Orden } from 'src/app/models/orden';

@Component({
  selector: 'app-reporte-salida',
  templateUrl: './reporte-salida.component.html',
  styleUrls: ['./reporte-salida.component.css']
})
export class ReporteSalidaComponent implements OnInit {
  @Input() model: Orden;
  constructor() { }

  ngOnInit() {
  }

}
