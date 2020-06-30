import {Component, OnInit} from '@angular/core';
import {Product} from '../../common/product';
import {ProductService} from '../../service/product.service';
import {ActivatedRoute} from '@angular/router';
import has = Reflect.has;

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[];
  currentCategoryId: number;

  constructor(private productService: ProductService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.getProductList();
    });
  }

  // tslint:disable-next-line:typedef
  getProductList() {

   const hasCurrentCategoryId: boolean = this.route.snapshot.paramMap.has('id');

   if (hasCurrentCategoryId){
     this.currentCategoryId = +this.route.snapshot.paramMap.get('id');
   }else {
     this.currentCategoryId = 1;
   }
   this.productService.getProductList(this.currentCategoryId).subscribe(
      data => {
        this.products = data;
      }
    );
  }
}
