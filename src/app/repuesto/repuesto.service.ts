import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Mecanico } from '../models/mecanico';
import { Page } from '../shared/page';

const httpHeaders = {
  headers: new HttpHeaders(environment.apiConfig.headers),
  reportProgress: true
}
const path = environment.apiConfig.path;

@Injectable({
  providedIn: 'root'
})
export class RepuestoService {
  repuestos: any;
  page: Page;
  constructor(private http: HttpClient) {
    this.page = new Page();
  }

  public getLocalItem(id: number) {
    let model = new Mecanico;
    if (!this.repuestos) {
      return model;
    }
    model = this.repuestos.data.find((item) => {
      return item.id == id;
    });
    return model;
  }

  public create(user) {
    return this.http.post(path + '/repuesto/create', user, httpHeaders)
      .pipe(
        tap((data: any) => {
          return of(data);
        }),
        catchError((err) => {
          return throwError(err);
        }),
      );
  }

  public all(filterSearch = null, reload = false) {
    if (this.repuestos && reload == false) {
      return of(this.repuestos);
    }
    let params = new HttpParams();
    params = params.append('page', this.page.index.toString());
    params = params.append('per_page', this.page.size.toString());
    params = params.append('filter', JSON.stringify(filterSearch));

    return this.http.get(path + '/repuesto/all', {
      headers: new HttpHeaders(environment.apiConfig.headers),
      reportProgress: true,
      params: params
    }).pipe(
      tap((data: any) => {
        this.repuestos = data;
        this.page.setValues(data.current_page, data.total, data.per_page);
        return of(data);
      }),
      catchError((err) => {
        return throwError(err);
      }),
    );
  }

  public show(id) {
    return this.http.get(path + '/repuesto/show/' + id, httpHeaders)
      .pipe(
        tap((data: any) => {
          return of(data);
        }),
        catchError((err) => {
          return throwError(err);
        }),
      );
  }

  public update(id, user) {
    return this.http.put(path + '/repuesto/update/' + id, user, httpHeaders)
      .pipe(
        tap((data: any) => {
          return of(data);
        }),
        catchError((err) => {
          return throwError(err);
        }),
      );
  }

  public delete(id) {
    return this.http.delete(path + '/repuesto/delete/' + id, httpHeaders)
      .pipe(
        tap((data: any) => {
          return of(data);
        }),
        catchError((err) => {
          return throwError(err);
        }),
      );
  }

  public restore(id) {
    return this.http.delete(path + '/repuesto/restore/' + id, httpHeaders)
      .pipe(
        tap((data: any) => {
          return of(data);
        }),
        catchError((err) => {
          return throwError(err);
        }),
      );
  }
}
