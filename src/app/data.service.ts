import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public loadingPercent: number;
  public isLoading: boolean;
  public error: any;
  public errorMessage: string;
  public errorErrors: string;
  constructor(private snackBar: MatSnackBar) {
    this.loadingPercent = 10;
    // this.isLoading = false;
    this.errorMessage = '';
  }

  public getStringErrors() {
    let message = '';
    for (const property of (this.errorErrors as any) ) {
      message += `${this.errorErrors[property][0]} `;
    }
    return message;
  }

  public showMessageError(){
    const errMessage = this.errorErrors ? this.getStringErrors() : this.errorMessage;
    this.openSnackBar(errMessage, 'Cerrar');
    console.log(this.error);
  }

  public openSnackBar(message: string, action: string) {
    return this.snackBar.open(message, action, {
      duration: 10000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  public showLoading() {
    this.isLoading = true;
  }

  public hideLoading() {
    this.isLoading = false;
  }

  public getIsloading(){
    return this.isLoading;
  }
}
