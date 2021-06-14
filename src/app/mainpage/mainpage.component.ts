import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-mainpage',
  templateUrl: './mainpage.component.html',
  styleUrls: ['./mainpage.component.css']
})
export class MainpageComponent implements OnInit {

  searchString= 'hii';

  constructor() { }

  ngOnInit(): void {
  }

  getSearchString(text: any){
    this.searchString=text;
    console.log(this.searchString)
  }

}
