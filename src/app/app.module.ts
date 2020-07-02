import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import {HttpClientModule} from '@angular/common/http';
import {ProductService} from './service/product.service';
import {RouterModule, Routes} from '@angular/router';
import { ProductCategoryManuComponent } from './components/product-category-manu/product-category-manu.component';
import { SearchComponent } from './components/search/search.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';

const routes: Routes = [
  { path: 'products/:id' , component: ProductDetailsComponent},
  { path: 'search/:keyword' , component: ProductListComponent},
  { path: 'category/:id' , component: ProductListComponent},
  { path: 'category' , component: ProductListComponent},
  { path: 'products' , component: ProductListComponent},
  { path: '' , redirectTo: '/products' , pathMatch: 'full'},
  { path: '**' , redirectTo: '/products' , pathMatch: 'full'},

 ];

@NgModule({
  declarations: [
    AppComponent,
    ProductListComponent,
    ProductCategoryManuComponent,
    SearchComponent,
    ProductDetailsComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [ProductService],
  bootstrap: [AppComponent]
})
export class AppModule { }
