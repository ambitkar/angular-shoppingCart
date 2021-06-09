import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';

import {ProductService} from 'src/app/services/product.service'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  product: any[] = [];

  constructor(private api: ProductService, private router: Router) { }

  ngOnInit(): void {
    this.getProductList();
  }
  getProductList(){
    this.api.getJsonData().subscribe(response=>{
      console.log(response);
      this.product=response;
    })
  }
  onClick(id: any){
    alert(id)
    console.log(id)
    this.router.navigate(['/productdetails', {productId: id}]);
  }
}
