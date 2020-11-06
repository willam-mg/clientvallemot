import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Orden } from '../models/orden';
import { Page } from '../shared/page';

const httpHeaders = {
  headers: new HttpHeaders(environment.apiConfig.headers),
  reportProgress: true
}
const path = environment.apiConfig.path;

@Injectable({
  providedIn: 'root'
})
export class OrdenService {

  medicos: any;
  page: Page;
  constructor(private http: HttpClient) {
    this.page = new Page();
  }

  public getLocalItem(id: number) {
    let model = new Orden;
    if (!this.medicos) {
      return model;
    }
    model = this.medicos.data.find((item) => {
      return item.id == id;
    });
    return model;
  }

  public create(user) {
    return this.http.post(path + '/orden/create', user, httpHeaders)
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

    return this.http.get(path + '/orden/all', {
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

  public show(id) {
    return this.http.get(path + '/orden/show/' + id, httpHeaders)
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
    return this.http.delete(path + '/orden/delete/' + id, httpHeaders)
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
    return this.http.delete(path + '/orden/restore/' + id, httpHeaders)
      .pipe(
        tap((data: any) => {
          return of(data);
        }),
        catchError((err) => {
          return throwError(err);
        }),
      );
  }




  /**
   * captura todos los tags tipo link 
   * @param tagName 
   * @return string tag type style
   */
  private getTagsHtml(tagName: keyof HTMLElementTagNameMap): string {
    const htmlStr: string[] = [];
    const elements = document.getElementsByTagName(tagName);
    for (let idx = 0; idx < elements.length; idx++) {
      htmlStr.push(elements[idx].outerHTML);
    }

    return htmlStr.join('\r\n');
  }

  /**
   * muestra una ventana emergente con 
   * la pantalla print abierta.
   * @param contenido 
   */
  public printInWindow(contenido: string) {
    let printContents, popupWin;
    printContents = document.getElementById(contenido).innerHTML;
    popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto,fullscreen=yes,menubar=0', false);
    popupWin.document.open();
    const stylesHtml = this.getTagsHtml('style');
    // const linksHtml = this.getTagsHtml('link');
    // onload = "window.print();window.close()"
    // ${ linksHtml }
    popupWin.document.write(`
      <html>
        <head>
          <title>Print tab</title>
          ${stylesHtml}
          <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
        </head>
        <script>
          function imprimir(){
            window.print();
            setTimeout(function(){
              window.close();
            }, 500);
          }
        </script>
        <body onload = "imprimir()">${printContents}</body>
      </html>`
    );
    popupWin.document.close();
  }
}
