import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { ProductService } from 'src/app/services/product.service'
import { SearchTextService } from '../services/search-text.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  product: any[] = [];
  results: any[] = [];
  $text: Subscription = new Subscription;
  searchText: String = new String;

  constructor(private api: ProductService, private search: SearchTextService, private router: Router) { }

  ngOnInit(): void {
    this.getProductList();
    this.$text = this.search.getSearchtext().subscribe((e) => {
      this.searchText = e;
      if (this.searchText == 'default' || this.searchText == '') {
        this.getProductList();
      } else {
        this.searchResult(this.searchText);
      }
      console.log(this.searchText)
    });
    console.log(this.searchText)
  }
  getProductList() {
    this.api.getJsonData().subscribe(response => {
      console.log(response);
      this.product = response;
    })
  }
  onClick(id: any) {
    alert(id)
    console.log(id)
    this.router.navigate(['/product-details', { id: id }]);
  }

  searchResult(text: String) {
    console.log(this.product.length)
    this.product = this.product.filter(function (item) {
      return item.name.toLowerCase().includes(text.toLowerCase())
    })
  }
}
