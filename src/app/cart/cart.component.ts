import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartitems : any[] = [];
  cartTotal: number = 0;
  cartStaus:boolean =false

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cartService.getItem().subscribe((item:any) =>{
      console.log(item)
      this.cartitems=item;
      console.log(this.cartitems);
      if(this.cartitems === null){
        this.cartStaus=false;
        return;
      }else{
        this.cartStaus=true;
        this.calculateCart();
      }
      
    })
  }
  calculateCart(){
    this.cartitems.forEach(item => {
      this.cartTotal+=(item.p_qty * item.p_price);
    })
  }

}
