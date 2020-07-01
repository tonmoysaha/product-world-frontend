import { Component, OnInit } from '@angular/core';
import {ProductService} from '../../service/product.service';
import {ProductCategory} from '../../common/product-category';

@Component({
  selector: 'app-product-category-manu',
  templateUrl: './product-category-manu.component.html',
  styleUrls: ['./product-category-manu.component.css']
})
export class ProductCategoryManuComponent implements OnInit {

  productCategories: ProductCategory[];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getProductCategories();
  }

  // tslint:disable-next-line:typedef
  getProductCategories(){
    this.productService.getProductCategories().subscribe(
      data => {
        console.log('product categories' + JSON.stringify(data));
        this.productCategories = data;
      }
    );
  }

}
