import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProductService } from '../services/product.service';
import { SearchTextService } from '../services/search-text.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Output() searchString = new EventEmitter<String>();
  searchItem: String =new String;
  product: any[] = [];


  constructor(private api: ProductService,private search: SearchTextService) { }


  ngOnInit(): void {
    this.getProductList();
  }
  
  onSubmit() {
    this.search.sendSearchText(this.searchItem);
    this.searchString.emit(this.searchItem);
  }
  
  getProductList(){
    this.api.getJsonData().subscribe(response=>{
      this.product=response;
    })
  }

  space(event: any){
    if(event.target.selectionStart === 0 && event.code === "Space"){
      event.preventDefault();
    }
  }
  

}
