import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpEventType,

} from '@angular/common/http';
import { LoginService } from './login/login.service';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { DataService } from './data.service';
@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
    constructor(
        public auth: LoginService,
        private dataService: DataService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        this.dataService.errorErrors = null;
        // this.dataService.isLoading = false;
        if (req.reportProgress) {
            return next.handle(req).pipe(
                tap((event: HttpEvent<any>) => {
                    if (event.type === HttpEventType.Sent) {
                        // this.dataService.isLoading = true;
                        this.dataService.showLoading();
                    } 
                    if (event.type === HttpEventType.UploadProgress) {
                        const percent = Math.round(event.loaded / event.total * 100);
                        this.dataService.loadingPercent = percent;
                    } else if (event.type === HttpEventType.Response) {
                        this.dataService.loadingPercent = 0;
                        this.dataService.hideLoading();
                        // this.dataService.isLoading = false;
                    }
                }
                // , error => {
                    // if (error.error instanceof Error) {
                    //     // A client-side or network error occurred. Handle it accordingly.
                    //     // console.error('An error occurred:', error.error.message);
                    //     this.dataService.errorMessage = 'No hay coneccion a internet';
                    // } else {
                    //     // The backend returned an unsuccessful response code.
                    //     // The response body may contain clues as to what went wrong,
                    //     // console.error(`Backend returned code ${error.status}, body was: ${error.error}`);
                    //     this.dataService.errorMessage = 'El servidor cayo';
                    // }

                    // this.dataService.loadingPercent = 0;
                    // this.dataService.isLoading = true;

                    // this.dataService.errorMessage = error.error.message;
                    // if (error.error.hasOwnProperty('errors')) {
                    //     this.dataService.errorErrors = error.error.errors;
                    // }
                // }
                )
            );
        } else {
            this.dataService.isLoading = false;
            return next.handle(req);
        }
    }
}