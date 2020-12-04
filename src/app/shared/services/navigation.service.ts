import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class NavigationService {
  private urlBack: string;
  private paramId: number;

  constructor(private router: Router) {
    this.urlBack = '/';
  }
  setBack(url: string, id: number = null) {
    this.paramId = id;
    this.urlBack = url;
  }

  back(): void {
    if (this.paramId === null) {
      this.router.navigateByUrl(this.urlBack);
    } else {
      this.router.navigate([this.urlBack], {
        queryParams:
        {
          id: '7'
        }
      });
    }
  }
}
