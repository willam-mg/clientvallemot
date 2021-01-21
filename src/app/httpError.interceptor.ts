import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { LoginService } from "./login/login.service";
import { Observable, of, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { catchError, retry, shareReplay } from 'rxjs/operators';
import { DataService } from './data.service';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  constructor(
    public auth: LoginService,
    private router: Router,
    private dataService: DataService) {
  }

  private handleError(err: HttpErrorResponse): Observable<any> {
    //  interceptor erro server bloqued or error cors hosting
    if (err.status === 0) {
      // this.dataService.isLoading = false;
      // this.dataService.hideLoading();
      this.dataService.error = err;
      this.dataService.errorMessage = 'Servidor no responde';
      this.dataService.showMessageError();
      return throwError(err);
    }

    // interceptor token and login enrrro 
    if (err.status === 401) {
      // this.dataService.hideLoading();
      this.auth.logOut();
      this.router.navigate(['/login']);
      // return of(err.message); // or EMPTY may be appropriate here
      return throwError(err);
    }

    // interceptor loading error
    if (err.error instanceof Error) {
      // A client-side or network error occurred. Handle it accordingly.
      // console.error('An error occurred:', err.error.message);
      this.dataService.errorMessage = 'An error occurred: ' + err.error.message;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      // console.error(`Backend returned code ${err.status}, body was: ${err.error}`);
      this.dataService.errorMessage = 'Servidor no disponible, intentelo mas tarde';
    }

    this.dataService.loadingPercent = 0;
    // this.dataService.hideLoading();

    this.dataService.error = err;
    this.dataService.errorMessage = err.error.message;
    if (err.error.hasOwnProperty('errors')) {
      this.dataService.errorErrors = err.error.errors;
    }

    this.dataService.showMessageError();

    return throwError(err);
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //// verificar si tiene conexion a internet
    // if (!window.navigator.onLine) {
    //   const err = {
    //     status: 0,
    //     error: {
    //       description: 'Verifique su conexion!'
    //     },
    //     message: 'No hay conexion a internet'
    //   };
    //   this.dataService.error = err;
    //   this.dataService.errorMessage = err.message;
    //   this.dataService.showMessageError();
    //   return throwError(new HttpErrorResponse(err));
    // }else{
      return next.handle(request)
        .pipe(
          // retry(1),
          catchError(err => this.handleError(err)),
          shareReplay()
        );
    // }

    // return next.handle(request)
    //   .pipe(
    //     // retry(1),
    //     `catchError`(err => this.handleError(err)),
    //     // shareReplay(1)
    //   );
    // this.dataService.isLoading = false;
    // this.dataService.hideLoading();

  }
}
