import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public loadingPercent:number = 10;
  public isLoading:boolean = false;
  public error:any;
  public errorMessage:string = '';
  public errorErrors:string = null;
  constructor(private _snackBar: MatSnackBar) { 
    this.isLoading = false;
  }

  public getStringErrors(){
    let message = '';
    console.log(this.errorErrors);
    for (const property in (this.errorErrors as any)) {
      // message += `${property}: ${this.errorErrors[property][0]} \n `;
      message += `${this.errorErrors[property][0]} `;
    }
    return message;
  }

  public showMessageError(){
    let errMessage = this.errorErrors ? this.getStringErrors() : this.errorMessage;
    this.openSnackBar(errMessage, 'Cerrar');
    console.log(this.error);
  }

  public openSnackBar(message: string, action: string) {
    return this._snackBar.open(message, action, {
      duration: 10000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
