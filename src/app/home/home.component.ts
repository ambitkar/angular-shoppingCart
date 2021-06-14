import { Component, Input, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';
import { SearchTextService } from '../services/search-text.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @Input() inputSearchText = new String;
  product: any[] = [];
  results: any[] = [];
  $text: Subscription = new Subscription;
  searchText: String = new String;
  cartItems: any[] = [];

  constructor(private productService: ProductService, private searchTextService: SearchTextService,private cartService: CartService, private router: Router) { }

  ngOnInit(): void {
    console.log(this.inputSearchText);
    this.getProductList();
    this.$text = this.searchTextService.getSearchtext().subscribe((e) => {
      this.searchText = e;
      if (this.searchText == null || this.searchText == '') {
        this.getProductList();
      } else {
        this.searchResult(this.searchText);
      }
    });
  }
  getProductList() {
    this.productService.getJsonData().subscribe(response => {
      this.product = response;
    })
  }
  onClick(id: any) {
    this.router.navigate(['/product-details', { id }]);
  }
  onClickCart(item: any) {
    
    alert('Item added to cart.');
    if(this.cartItems.length === 0){
      this.cartItems.push({
        p_id: item.id,
        p_name: item.name,
        p_price: item.price,
        p_qty: 1
      });
    }else{
      for(let i in this.cartItems){
        if(this.cartItems[i].p_id === item.id){
          this.cartItems[i].p_qty++;
          break;
        }else{
          this.cartItems.push({
            p_id: item.id,
            p_name: item.name,
            p_price: item.price,
            p_qty: 1
          });
        }
      }
    }
    
   
    this.cartService.sendItem(this.cartItems);
  }

  searchResult(text: String) {
    this.product = this.product.filter(function (item) {
      return item.name.toLowerCase().includes(text.toLowerCase())
    })
  }
}
