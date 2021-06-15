import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';
import { CartCounterService } from '../services/cart-counter.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnChanges {
  @Input() inputSearchText = '';
  product: any[] = [];
  results: any[] = [];
  $text: Subscription = new Subscription;
  searchText: String = new String;
  cartItems: any[] = [];

  constructor(private productService: ProductService, private cartCounterService: CartCounterService, private cartService: CartService, private router: Router) { }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(this.inputSearchText)
    if (this.inputSearchText == null || this.inputSearchText == '') {
      this.getProductList();
    } else {
      this.searchResult(this.inputSearchText);
    }

  }

  ngOnInit(): void {
    console.log(this.inputSearchText);
    this.getProductList();
    // this.$text = this.searchTextService.getSearchtext().subscribe((e) => {
    //   this.searchText = e;
    //   if (this.searchText == null || this.searchText == '') {
    //     this.getProductList();
    //   } else {
    //     this.searchResult(this.searchText);
    //   }
    // });
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

    console.log(!this.cartItems.length)
    if (!this.cartItems.length) {
      this.cartItems.push({
        p_id: item.id,
        p_name: item.name,
        p_price: item.price,
        p_qty: 1
      });
      this.cartCounterService.sendCartNo(this.cartItems.length);
    } else {
      for (let i in this.cartItems) {
        if (this.cartItems[i].p_id === item.id) {
          this.cartItems[i].p_qty++;
          break;
        } else {
          this.cartItems.push({
            p_id: item.id,
            p_name: item.name,
            p_price: item.price,
            p_qty: 1
          });
          this.cartCounterService.sendCartNo(this.cartItems.length);
          break;
        }
      }
    }

    this.cartService.sendItem(this.cartItems);
    alert('Item added to cart.');
  }

  searchResult(text: String) {
    this.product = this.product.filter(function (item) {
      return item.name.toLowerCase().includes(text.toLowerCase())
    })
  }
}
