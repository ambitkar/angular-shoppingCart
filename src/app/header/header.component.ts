import { AfterViewInit, Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { SearchTextService } from '../services/search-text.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit,AfterViewInit {
  @Output() searchString: EventEmitter<String> = new EventEmitter();
  cartNo = 0;
  searchItem: String = new String;
  product: any[] = [];


  constructor(private productService: ProductService, private searchTextService: SearchTextService, private router: Router) { }
  ngAfterViewInit(): void {
    this.cartNo=0;
  }


  ngOnInit(): void {
    this.getProductList();
    this.cartNo=0;
    this.searchTextService.getCartNo().subscribe((e) => {
      this.cartNo = e;
      console.log(e);
    });
  }

  onSubmit() {
    //this.searchTextService.sendSearchText(this.searchItem);
    this.searchString.emit(this.searchItem);
  }

  getProductList() {
    this.productService.getJsonData().subscribe(response => {
      this.product = response;
    })
  }

  space(event: any) {
    if (event.target.selectionStart === 0 && event.code === "Space") {
      event.preventDefault();
    }
  }

  onCartClick() {
    this.router.navigate(['/cart']);
  }


}
