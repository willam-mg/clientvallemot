import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from 'src/app/data.service';
import { Mecanico } from 'src/app/models/mecanico';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { MecanicoService } from '../mecanico.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {
  id: any;
  model: Mecanico;

  constructor(
    private route: ActivatedRoute,
    private medicamentoService: MecanicoService,
    public dialog: MatDialog,
    private router: Router,
    private dataService: DataService) {
  }

  ngOnInit() {
    this.model = new Mecanico;
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
      if (!this.id) {
        this.router.navigate(['/medicamentos']);
      }
    });
    this.model = this.medicamentoService.getLocalItem(this.id);
    this.loadData();
  }

  loadData() {
    this.medicamentoService.show(this.id).subscribe(data => {
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
        this.medicamentoService.delete(this.model.id).subscribe(data => {
          this.dataService.openSnackBar(data.message, 'Deshacer').onAction().subscribe(() => {
            this.medicamentoService.restore(data.id).subscribe(data => {
              this.dataService.openSnackBar(data.message, 'cerrar');
              this.router.navigate(['/medicamentos/show'], {
                queryParams:
                {
                  id: data.id
                }
              });
            });
          });
          this.router.navigate(['/medicamentos']);

        });
      }
    });
  }

}
