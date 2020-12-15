import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import * as moment from 'moment';
import { Observable, of, throwError } from 'rxjs';
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
export class MecanicoService {
  medicos: any;
  page: Page;
  constructor(private http: HttpClient) {
    this.page = new Page();
  }

  public getLocalItem(id: number) {
    let model = new Mecanico;
    if (!this.medicos) {
      return model;
    }
    model = this.medicos.data.find((item) => {
      return item.id == id;
    });
    return model;
  }

  public create(user) {
    return this.http.post(path + '/mecanico/create', user, httpHeaders)
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
    if (this.medicos && reload == false) {
      return of(this.medicos);
    }
    let params = new HttpParams();
    params = params.append('page', this.page.index.toString());
    params = params.append('per_page', this.page.size.toString());
    params = params.append('filter', JSON.stringify(filterSearch));

    return this.http.get(path + '/mecanico/all', {
      headers: new HttpHeaders(environment.apiConfig.headers),
      reportProgress: true,
      params: params
    }).pipe(
      tap((data: any) => {
        this.medicos = data;
        this.page.setValues(data.current_page, data.total, data.per_page);
        return of(data);
      }),
      catchError((err) => {
        return throwError(err);
      }),
    );
  }


  public todos(): Observable<Mecanico[]> {
    return this.http.get<Mecanico[]>(path + '/mecanico/todos', {
      headers: new HttpHeaders(environment.apiConfig.headers)
    });
  }
  // public todos(): Observable<Mecanico[]> {
  //   return this.http.get(path + '/mecanico/todos', {
  //     headers: new HttpHeaders(environment.apiConfig.headers)
  //   }).pipe(
  //     tap((data: any) => {
  //       return of(data);
  //     })
  //   );
  // }

  public show(id) {
    return this.http.get(path + '/mecanico/show/' + id, httpHeaders)
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
    return this.http.put(path + '/mecanico/update/' + id, user, httpHeaders)
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
    return this.http.delete(path + '/mecanico/delete/' + id, httpHeaders)
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
    return this.http.delete(path + '/mecanico/restore/' + id, httpHeaders)
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
