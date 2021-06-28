import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SellerapiService {

  constructor(private http: HttpClient) { }

  postCategory(data: any){
    return this.http.post<any>("http://localhost:3000/posts",data)
    .pipe(map((res: any)=>{return res;}))
  }
}
