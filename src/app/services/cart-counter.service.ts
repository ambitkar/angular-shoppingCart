import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartCounterService {
  // private subject = new BehaviorSubject<any>(null);

  // constructor() { }

  // sendSearchText(text: String){
  //   this.subject.next(text);
  // }
  // getSearchtext(){
  //   return this.subject.asObservable();
  // }

  private subject = new BehaviorSubject<any>(0);

  constructor() { }

  sendCartNo(no: number){
    this.subject.next(no);
  }
  getCartNo(){
    return this.subject.asObservable();
  }
}
