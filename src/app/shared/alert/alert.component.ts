import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {
  message:string;
  title:string;
  confirm:boolean;
  time:number;
  interval:any;
  progressLoading:number;
  constructor(
    public dialogRef: MatDialogRef<AlertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { 
    this.progressLoading = 0;
    this.message = data.message ? data.message:'';
    this.title = data.title ? data.title:'';
    this.confirm = data.confirm ? data.confirm:false;
    this.time = data.time ? data.time:5000;

    if(!this.confirm){
      this.loading();
    }
  }

  loading(){
    let start:number = 0;
    this.interval = setInterval((args) => { 
      start+=100;
      this.progressLoading = Math.round(start / this.time * 100);
      if (start === this.time){
        clearInterval(this.interval);
        this.confirmAndClose(false); 
      }
    }, 100);
  }

  confirmAndClose(res = true): void {
    if (this.interval){
      clearInterval(this.interval);
    }
    this.dialogRef.close(res);
  }

  ngOnInit() {
  }

}
