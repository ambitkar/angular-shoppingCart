import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

import { ProductService } from '../services/product.service'
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
    });
  }
  getProductList() {
    this.api.getJsonData().subscribe(response => {
      this.product = response;
    })
  }
  onClick(id: any) {
    this.router.navigate(['/product-details', { id }]);
  }

  searchResult(text: String) {
    this.product = this.product.filter(function (item) {
      return item.name.toLowerCase().includes(text.toLowerCase())
    })
  }
}
