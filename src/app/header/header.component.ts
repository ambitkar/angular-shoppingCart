import { AfterViewInit, Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { CartCounterService } from '../services/cart-counter.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, AfterViewInit {
  @Output() searchString: EventEmitter<String> = new EventEmitter();
  username = '';
  registerBtnName='Register'
  cartCount = 0;
  searchItem: String = new String;
  product: any[] = [];


  constructor(private productService: ProductService, private cartCounterService: CartCounterService, private router: Router) { }
  ngAfterViewInit(): void {
    this.cartCount = 0;
  }


  ngOnInit(): void {
    console.log(localStorage.getItem('loginStatus'))
    if(localStorage.getItem('loginStatus')==null){
      this.username='';
      this.registerBtnName='Register';
    }
    else if(localStorage.getItem('loginStatus')=='loggedIn'){
      this.username=JSON.parse(localStorage.getItem('userData')!).firstname;
      this.registerBtnName='Sign Out';
    }else{
      this.username='';
      this.registerBtnName='Sign In';
    }
    this.getProductList();
    this.cartCount = 0;
    this.cartCounterService.getCartCount().subscribe((value) => {
      this.cartCount = value;
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

  onRegisterClick() {
    if(this.registerBtnName == 'Register'){
    this.router.navigate(['/registration']) 
    }else if(this.registerBtnName == 'Sign Out'){
      localStorage.setItem('loginStatus','loggedOut');
      this.registerBtnName='Sign In';
      this.username='';
    }else{      
      this.router.navigate(['/login']);
    }
  }

  onLogoutClick(){
    localStorage.clear();
    this.registerBtnName='Register';
    this.username='';
  }
}
