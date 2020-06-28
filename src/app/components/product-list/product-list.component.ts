import {Component, OnInit} from '@angular/core';
import {Product} from '../../common/product';
import {ProductService} from '../../service/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[];

  constructor(private productService: ProductService) {
  }

  ngOnInit(): void {
    this.getProductList();
  }


  // tslint:disable-next-line:typedef
   getProductList() {
    this.productService.getProductList().subscribe(
      data => {
        this.products = data;
      }
    );
  }
}
