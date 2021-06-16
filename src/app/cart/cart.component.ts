import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartitems: any[] = [];
  cartTotal: number = 0;
  cartStaus: boolean = false

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.getItem().subscribe((item: any) => {
      this.cartitems = item;
      console.log(this.cartitems);
      if (this.cartitems === null) {
        this.cartStaus = false;
        return;
      } else {
        this.cartStaus = true;
        this.calculateCart();
      }

    })
  }
  calculateCart() {
    this.cartTotal = 0;
    this.cartitems.forEach(item => {
      this.cartTotal += (item.p_qty * item.p_price);
    })
  }

  onClickAdd(item:any) {
    item.p_qty++;
    this.calculateCart();
  }
  onClickRemove(item:any) { 
    if(item.p_qty == 1){
        for(let i = 0; i < this.cartitems.length; ++i){
            if (this.cartitems[i].p_id === item.p_id) {
                this.cartitems.splice(i,1);
            }
        }
        this.calculateCart();
    }else{
      item.p_qty--;
      this.calculateCart();
    }
  }

}
