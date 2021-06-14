import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchTextService {
  private subject = new BehaviorSubject<any>(null);

  constructor() { }

  sendSearchText(text: String){
    this.subject.next(text);
  }
  getSearchtext(){
    return this.subject.asObservable();
  }
}
