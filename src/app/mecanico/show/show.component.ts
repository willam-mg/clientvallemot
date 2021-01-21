import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { Mecanico } from 'src/app/models/mecanico';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { NavigationService } from 'src/app/shared/services/navigation.service';
import { MecanicoService } from '../mecanico.service';

@Component({
  selector: 'app-show',
  templateUrl: './show.component.html',
  styleUrls: ['./show.component.css']
})
export class ShowComponent implements OnInit {
  id: any;
  model: Mecanico;
  subscripcion: Subscription;

  constructor(
    private route: ActivatedRoute,
    private modelService: MecanicoService,
    public dialog: MatDialog,
    private router: Router,
    private navigationService: NavigationService) {
    this.navigationService.setBack('/mecanicos');
    this.model = new Mecanico();
    this.subscripcion = new Subscription();
  }

  ngOnInit() {
    this.subscripcion.add(
      this.route.queryParams.subscribe(params => {
        this.id = params.id;
        this.model = this.modelService.getLocalItem(this.id);
        this.loadData();
      })
    );
  }

  loadData() {
    this.subscripcion.add(
      this.modelService.show(this.id).subscribe(data => {
        this.model = data;
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
        this.subscripcion.add(
          this.modelService.delete(this.model.id).subscribe( () => {
            this.router.navigate(['/mecanicos']);
          })
        );
      }
    });
  }

}
