import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {
  product: any[]=[];
  selectedProduct: any[]=[];
  id: string | null | undefined;

  constructor(private api: ProductService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getProductList();
    console.log(this.route.snapshot.paramMap.get('id'));
    this.id=this.route.snapshot.paramMap.get('id');
    
    
  }
  getProductList(){
    this.api.getJsonData().subscribe(response=>{
      this.product=response;
      this.getProdDetails();
    })
  }

  getProdDetails(){
    alert(this.id)
    for (var i = 0; i < this.product.length; i++) {
      const element = this.product[i];
      if (this.id==element.id) {
        this.selectedProduct.push(element);
        console.log(this.selectedProduct[0])
        break;
    } else {
      alert('not available!');
    }
    }
    
  }

}
