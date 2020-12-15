import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { tap, catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Accesorio } from '../models/accesorio';
import { Page } from '../shared/page';


const httpHeaders = {
  headers: new HttpHeaders(environment.apiConfig.headers),
  reportProgress: true
}
const path = environment.apiConfig.path;


@Injectable({
  providedIn: 'root'
})
export class AccesorioService {
  accesorios: any;
  todosAccesorios: Array<Accesorio>;
  page: Page;
  headers: HttpHeaders;
  constructor(private http: HttpClient) {
    this.page = new Page();
    this.todosAccesorios = [];
    this.headers = new HttpHeaders(environment.apiConfig.headers);
  }

  public getLocalItem(id: number) {
    let model = new Accesorio();
    if (!this.accesorios) {
      return model;
    }
    model = this.accesorios.data.find((item) => {
      return item.id === id;
    });
    return model;
  }

  public create(user) {
    return this.http.post(path + '/accesorio/create', user, httpHeaders)
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
    if (this.accesorios && reload === false) {
      return of(this.accesorios);
    }
    let myParams = new HttpParams();
    myParams = myParams.append('page', this.page.index.toString());
    myParams = myParams.append('per_page', this.page.size.toString());
    myParams = myParams.append('filter', JSON.stringify(filterSearch));

    return this.http.get(path + '/accesorio/all', {
      headers: new HttpHeaders(environment.apiConfig.headers),
      reportProgress: true,
      params: myParams
    }).pipe(
      tap((data: any) => {
        this.accesorios = data;
        this.page.setValues(data.current_page, data.total, data.per_page);
        return of(data);
      }),
      catchError((err) => {
        return throwError(err);
      }),
    );
  }

  public todos(reload = false): Observable<Accesorio[]> {
    // if (this.todosAccesorios.length && reload === false) {
    //   console.log('retornando lo que ya existe');
    //   return of(this.todosAccesorios);
    // }

    return this.http.get<Accesorio[]>(path + '/accesorio/todos', { headers: this.headers });
      // .pipe(
      //   map( (res: any) => 
      //     res.map( (data) => {
      //       return {
      //         id: data.id
      //       };
      //     })
      //   )
      // );
  }
  // return this.http.get(path + '/accesorio/todos', {
  //   headers: new HttpHeaders(environment.apiConfig.headers)
  // }).pipe(
  //   tap((data: any) => {
  //     this.todosAccesorios = data;
  //     return of(data);
  //   })
  // );

  public show(id) {
    return this.http.get(path + '/accesorio/show/' + id, httpHeaders)
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
    return this.http.put(path + '/accesorio/update/' + id, user, httpHeaders)
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
    return this.http.delete(path + '/accesorio/delete/' + id, httpHeaders)
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
    return this.http.delete(path + '/accesorio/restore/' + id, httpHeaders)
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
