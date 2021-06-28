import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddsellItemComponent } from './addsell-item/addsell-item.component';
import { CartComponent } from './cart/cart.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MainpageComponent } from './mainpage/mainpage.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { RegisterComponent } from './register/register.component';
import { SellerHomeComponent } from './seller-home/seller-home.component';

const routes: Routes = [
  {
    path:  '',
    component:  MainpageComponent
    },
  {
    path:  'product-details/:id',
    component: ProductDetailsComponent
  },
  {
    path:  'cart',
    component: CartComponent
  },
  {
    path:  'registration',
    component: RegisterComponent
  },
  {
    path:  'login',
    component: LoginComponent
  },
  {
    path:  'seller-home',
    component: SellerHomeComponent
  },
  {
    path:  'sell-item/:id',
    component: AddsellItemComponent
  },
  {
    path: '**',
    pathMatch   : 'full',
    component: PageNotFoundComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
