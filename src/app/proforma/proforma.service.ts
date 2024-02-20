import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Observer, of, throwError } from 'rxjs';
import { tap, catchError, shareReplay } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { LaravelRequest } from '../models/laravel-request';
import { Orden } from '../models/orden';
import { Page } from '../shared/page';

const httpHeaders = {
  headers: new HttpHeaders(environment.apiConfig.headers),
  reportProgress: true
};

const path = environment.apiConfig.path;

@Injectable({
  providedIn: 'root'
})
export class ProformaService {

  ordenes: any;
  page: Page;
  constructor(private http: HttpClient) {
    this.page = new Page();
  }

  public getLocalItem(id: number) {
    let model = new Orden();
    if (!this.ordenes) {
      return model;
    }
    model = this.ordenes.data.find((item) => {
      return item.id == id;
    });
    return model;
  }

  public create(orden) {
    return this.http.post(path + '/proformas/create', orden, httpHeaders)
      .pipe(
        tap((data: any) => {
          return of(data);
        }),
        catchError((err) => {
          return throwError(err);
        }),
      );
  }


  public detalleCreate(body) {
    return this.http.post(path + '/orden/detalle/create', body, httpHeaders)
      .pipe(
        tap((data: any) => {
          return of(data);
        }),
        catchError((err) => {
          return throwError(err);
        }),
      );
  }

  public addManoObra(body) {
    return this.http.post(path + '/orden/detalle/manoobra', body, httpHeaders)
      .pipe(
        tap((data: any) => {
          return of(data);
        }),
        catchError((err) => {
          return throwError(err);
        }),
      );
  }

  public addRepuesto(body) {
    return this.http.post(path + '/orden/detalle/add-repuesto', body, httpHeaders)
      .pipe(
        tap((data: any) => {
          return of(data);
        }),
        catchError((err) => {
          return throwError(err);
        }),
      );
  }

  public editManoObra(id, body) {
    return this.http.put(path + '/orden/detalle/editmanoobra/' + id, body, httpHeaders)
      .pipe(
        tap((data: any) => {
          return of(data);
        }),
        catchError((err) => {
          return throwError(err);
        }),
      );
  }

  public editRepuesto(id, body) {
    return this.http.put(path + '/orden/detalle/edit-repuesto/' + id, body, httpHeaders)
      .pipe(
        tap((data: any) => {
          return of(data);
        }),
        catchError((err) => {
          return throwError(err);
        }),
      );
  }

  public all(filterSearch = null, reload = false, esProforma: string | null = '1', page: Page = new Page() ): Observable<Orden[]> {
    if (this.ordenes && reload === false) {
      return of(this.ordenes);
    }
    let myParams = new HttpParams();
    myParams = myParams.append('page', page.index.toString());
    myParams = myParams.append('per_page', page.size.toString());
    myParams = myParams.append('filter', JSON.stringify(filterSearch));
    if (esProforma) {
      myParams = myParams.append('es_proforma', esProforma);
    }

    // return this.http.get<LaravelRequest>(path + '/orden/all', {
    //   headers: new HttpHeaders(environment.apiConfig.headers),
    //   reportProgress: true,
    //   params: myParams
    // }).pipe(
    //   tap((data: LaravelRequest) => {
    //     this.ordenes = data;
    //     this.page.setValues(data.current_page, data.total, data.per_page);
    //     // return of(data);
    //   })
    // );
    return this.http.get<Orden[]>(path + '/orden/all', {
      headers: new HttpHeaders(environment.apiConfig.headers),
      reportProgress: true,
      params: myParams
    });
  }

  public getMarcas(): Observable<any[]> {
    return this.http.get<any[]>('/assets/json/marcas.json');
  }

  public getModelos(): Observable<any[]> {
    return this.http.get<any[]>('/assets/json/modelos.json');
  }

  public listRepuestos() {
    return this.http.get(path + '/repuesto/all', {
      headers: new HttpHeaders(environment.apiConfig.headers),
      reportProgress: true
    }).pipe(
      tap((data: any) => {
        return of(data);
      }),
      catchError((err) => {
        return throwError(err);
      }),
    );
  }

  public show(id: number): Observable<Orden> {
    return this.http.get<Orden>(path + '/orden/show/' + id, httpHeaders);
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

  public deleteManoObra(id) {
    return this.http.delete(path + '/orden/detalle/deletemanoobra/' + id, httpHeaders)
      .pipe(
        tap((data: any) => {
          return of(data);
        }),
        catchError((err) => {
          return throwError(err);
        }),
      );
  }

  public deleteRepuesto(id) {
    return this.http.delete(path + '/orden/detalle/delete-repuesto/' + id, httpHeaders)
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

  public restoreManoObra(id) {
    return this.http.delete(path + '/orden/detalle/restoremanoobra/' + id, httpHeaders)
      .pipe(
        tap((data: any) => {
          return of(data);
        }),
        catchError((err) => {
          return throwError(err);
        }),
      );
  }

  public restoreRepuesto(id) {
    return this.http.delete(path + '/orden/detalle/restore-repuesto/' + id, httpHeaders)
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
    for (let idx: number = 0; idx < elements.length; idx++) {
      htmlStr.push(elements[idx].outerHTML);
    }
    return htmlStr.join('\r\n');
  }

  public update(id, body) {
    return this.http.put(path + '/orden/update/' + id, body, httpHeaders)
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
   * muestra una ventana emergente con 
   * la pantalla print abierta.
   * @param contenido 
   */
  public printInWindow(contenido: string) {
    // let printContents, popupWin;
    const printContents = document.getElementById(contenido).innerHTML;
    const popupWin = window.open('', '_blank', 'top=0,left=0,height=100%,width=auto,fullscreen=yes,menubar=0');
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

  public getSimilares(id: number, page: Page = new Page() ): Observable<any[]> {
    let myParams = new HttpParams();
    myParams = myParams.append('page', page.index.toString());
    myParams = myParams.append('per_page', page.size.toString());

    return this.http.get(`${path}/orden/similares/${id}`, {
      headers: new HttpHeaders(environment.apiConfig.headers),
      reportProgress: true,
      params: myParams
    }).pipe(
      tap((data: any) => {
        return of(data);
      }),
      catchError((err) => {
        return throwError(err);
      }),
    );
  }
}
