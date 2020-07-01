import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ProductService} from '../../service/product.service';
import {Product} from '../../common/product';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit {

  product: Product;
  constructor(private productService: ProductService, private route: ActivatedRoute) { }

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
}
