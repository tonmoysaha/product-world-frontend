import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProductService} from '../../service/product.service';
import {Product} from '../../common/product';
import {CartitemService} from '../../service/cartitem.service';
import {CartItem} from '../../common/cart-item';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: Product = new Product();
  constructor(private productService: ProductService, private cartService: CartitemService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.getPeoduct();
      });
  }

  // tslint:disable-next-line:typedef
  getPeoduct(){

   const productId: number = +this.route.snapshot.paramMap.get('id');
   this.productService.getProduct(productId).subscribe(
      data => {
        this.product = data;
      }
    );
  }

  addTocart() {

    const theCartItem = new CartItem(this.product);

    this.cartService.addTocart(theCartItem);
  }
}
