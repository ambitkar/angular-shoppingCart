import { Injectable } from '@angular/core';
import { Subject,BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private subject = new BehaviorSubject(null);

  constructor() { }

  sendItem(item:any){
    //console.log(item)
    this.subject.next(item);
  }
  getItem(){
    return this.subject.asObservable();
  }
}