import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataserviceService {

  private messageSource = new BehaviorSubject(false);
  currentMessage = this.messageSource.asObservable();
  constructor() { }
  changeMessage(message: boolean){
    this.messageSource.next(message)
  }
}
