import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap, catchError } from 'rxjs/operators';
import { of, throwError, Observable } from 'rxjs';
import { Page } from '../shared/page';
import { User } from '../models/user';

const httpHeaders = {
  headers: new HttpHeaders(environment.apiConfig.headers),
  reportProgress: true
}
const path = environment.apiConfig.path;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  usuarios:any;
  public page:Page;

  constructor(private http: HttpClient) { 
    this.page = new Page;
  }

  public getLocalUser(id:number){
    let user = new User;
    if (!this.usuarios) {
      return user;
    }
    user = this.usuarios.data.find((user)=>{
      return user.id == id;
    });
    return user;
  }

  /**
   * login service user administrador
   * @param email 
   * @param password 
   * 
   * @return '{user,token}'
   */
  public getUsuarios(filterSearch = null, load = false):Observable<any>{
    if (this.usuarios && load == false){
      return of(this.usuarios);
    }

    let params = new HttpParams();
    params = params.append('page', this.page.index.toString());
    params = params.append('per_page', this.page.size.toString());
    params = params.append('filter', JSON.stringify(filterSearch));
    return this.http.get(path + '/admin/list', {
      headers: new HttpHeaders(environment.apiConfig.headers),
      reportProgress: true,
      params: params
    }).pipe(
      tap((data: any) => {
        this.usuarios = data;
        this.page.setValues(data.current_page, data.total, data.per_page);
        return of(data);
      }),
      catchError((err) => {
        return throwError(err);
      }),
    );
  }
  
  public getUser(id): Observable<any> {
    return this.http.get(path + '/admin/show/'+id, httpHeaders)
      .pipe(
        tap((data: any) => {
          return of(data);
        }),
        catchError((err) => {
          return throwError(err);
        }),
      );
  }

  public register(user): Observable<any> {
    return this.http.post(path + '/admin/register', user, httpHeaders)
      .pipe(
        tap((data: any) => {
          return of(data);
        }),
        catchError((err) => {
          return throwError(err);
        }),
      );
  }
  
  public update(id, user): Observable<any> {
    return this.http.put(path + '/admin/update/'+id, user, httpHeaders)
      .pipe(
        tap((data: any) => {
          return of(data);
        }),
        catchError((err) => {
          return throwError(err);
        }),
      );
  }

  public changePassword(id, user): Observable<any> {
    return this.http.patch(path + '/admin/update-password/'+id, user, httpHeaders)
      .pipe(
        tap((data: any) => {
          return of(data);
        }),
        catchError((err) => {
          return throwError(err);
        }),
      );
  }
  
  public delete(id): Observable<any> {
    return this.http.delete(path + '/admin/delete/'+id, httpHeaders)
      .pipe(
        tap((data: any) => {
          return of(data);
        }),
        catchError((err) => {
          return throwError(err);
        }),
      );
  }
  
  public restore(id): Observable<any> {
    return this.http.delete(path + '/admin/restore/'+id, httpHeaders)
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
