import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment  } from "../../environments/environment";
import { map, tap, catchError, retry } from 'rxjs/operators';
import { throwError, of, Observable } from 'rxjs';
import { User } from '../models/user';

const httpHeaders = {
  headers: new HttpHeaders(environment.apiConfig.headers),
  reportProgress: true
}
const path = environment.apiConfig.path;

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  /**
   * login service user administrador
   * @param email 
   * @param password 
   * 
   * @return '{user,token}'
   */
  // public login(email: string, password: string): Observable<any>{
  // public login(email: string, password: string){
  public login(formLogin){
    let body = {
      "email":formLogin.email,
      "password":formLogin.password
    };

    return this.http.post(path + '/admin/login', body, httpHeaders)
      .pipe(
        tap((data: any) => {
          return of(data);
        }),
        catchError((err) => {
          return throwError(err);
        }),
        // retry(3),
      );
  }

  public getToken(): string {
    return localStorage.getItem(environment.store.userToken);
  }

  public setFotoUser(foto){
    let user = this.getUser();
    user.foto = foto;
    localStorage.setItem(environment.store.userData, JSON.stringify(user))
  }
  
  public setUser(data){
    localStorage.setItem(environment.store.userData, JSON.stringify(data))
  }

  public getUser(): User {
    if( !localStorage.hasOwnProperty(environment.store.userData) ){
      return null;
    }
    let user = JSON.parse(localStorage.getItem(environment.store.userData));
    return user;
  }

  public isAuthenticated(): boolean {
    return this.getToken()?true:false;
  }

  public sendMail(email){
    let body = {
      "email": email,
    };
    return this.http.post(path + '/admin/forgot-password', body, httpHeaders)
      .pipe(
        tap((data: any) => {
          return of(data);
        }),
      );
  }

  public logOut(){
    localStorage.removeItem(environment.store.userId);
    localStorage.removeItem(environment.store.userToken);
    localStorage.removeItem(environment.store.userData);
  }

  public setPlayerId(playerid) {
    console.log('estableciendo el player id en local storage', playerid);
    
    localStorage.setItem('plonsigd', playerid);
  }

  public getPlayerId() {
    localStorage.getItem('plonsigd');
  }

  public hasPlayerId() {
    return localStorage.hasOwnProperty('plonsigd');
  }

  public sendPlayerIdUser(): Observable<any> {
    let body = {
      player_id:this.getPlayerId()
    };
    return this.http.post(path + '/admin/set-playerid', body, httpHeaders)
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
