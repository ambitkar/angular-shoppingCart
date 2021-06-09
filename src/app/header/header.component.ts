import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  searchItem: string | undefined;
  product: any[] = [];
  results: any[] = [];


  constructor(private api: ProductService) { }


  ngOnInit(): void {
    this.getProductList();
  }
  
  onSubmit() {
    //return this.searchItem;
    console.log(this.searchItem);
    this.searchResult();
  }
  
  getProductList(){
    this.api.getJsonData().subscribe(response=>{
      this.product=response;
      console.log(this.product.length)
    })
  }
  searchResult(){
    console.log(this.product.length)
    for (var i = 0; i < this.product.length; i++) {
      const element = this.product[i];
      if (element.name.toLowerCase().includes(this.searchItem)) {
        this.results.push(element);
    } else {
      alert('not available!');
    }
    }
  }

}
