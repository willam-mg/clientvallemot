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
import { catchError } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(
        public auth: LoginService,
        private router: Router) {
    }

    // private handleAuthError(err: HttpErrorResponse): Observable<any> {
    //     // if (err.status === 401 || err.status === 403) {
    //     if (err.status === 401) {
    //         this.router.navigate(['/login']);
    //         return of(err.message); // or EMPTY may be appropriate here
    //     }
    //     return throwError(err);
    // }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (this.auth.isAuthenticated()){
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${this.auth.getToken()}`
                }
            });
        }

        return next.handle(request);
        // .pipe( catchError( err => this.handleAuthError(err) ) );
    }
}