import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { SearchTextService } from '../services/search-text.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  searchItem: String =new String;
  product: any[] = [];


  constructor(private api: ProductService,private search: SearchTextService) { }


  ngOnInit(): void {
    this.getProductList();
  }
  
  onSubmit() {
    //return this.searchItem;
    console.log(this.searchItem);
    this.search.sendSearchText(this.searchItem);
  }
  
  getProductList(){
    this.api.getJsonData().subscribe(response=>{
      this.product=response;
      console.log(this.product.length)
    })
  }

  space(event: any){
    if(event.target.selectionStart === 0 && event.code === "Space"){
      event.preventDefault();
    }
  }
  

}
