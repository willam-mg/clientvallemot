import { Injectable } from '@angular/core';
import { EventEmitter } from 'events';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  public isLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  // public isLoading: EventEmitter;
  // isLoading = new EventEmitter<string>();
  constructor() {
    // this.isLoading = new EventEmitter<boolean>();
  }
}
