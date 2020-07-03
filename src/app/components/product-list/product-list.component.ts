import {Component, OnInit} from '@angular/core';
import {Product} from '../../common/product';
import {ProductService} from '../../service/product.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: Product[] = [];
  currentCategoryId = 1;
  searchMode = false;
  // set propertise for pagination
  thePageNumber = 1;
  thePageSize = 10;
  theToallElemets = 0;
  private previousCategoryId = 1;
  private  previousKeyword: string = null;

  constructor(private productService: ProductService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      this.getProductList();
    });
  }

  // tslint:disable-next-line:typedef
  getProductList() {

    this.searchMode = this.route.snapshot.paramMap.has('keyword');

    if (this.searchMode) {
      this.handleSearchProducts();
    } else {
      this.handlegetProductList();
    }

  }


  // tslint:disable-next-line:typedef
  handlegetProductList() {
    const hasCurrentCategoryId: boolean = this.route.snapshot.paramMap.has('id');

    if (hasCurrentCategoryId) {
      this.currentCategoryId = +this.route.snapshot.paramMap.get('id');
    } else {
      this.currentCategoryId = 1;
    }


    if (this.previousCategoryId !== this.currentCategoryId) {
      this.thePageNumber = 1;
    }
    this.previousCategoryId = this.currentCategoryId;

    console.log(`${this.previousCategoryId} == ${this.currentCategoryId}`);

    this.productService.getProductListPaginate(this.thePageNumber - 1, this.thePageSize, this.currentCategoryId).subscribe(
      this.processData());

  }

  // tslint:disable-next-line:typedef
  private processData() {
    return data => {
      this.products = data._embedded.products;
      this.thePageNumber = data.page.number + 1;
      this.thePageSize = data.page.size;
      this.theToallElemets = data.page.totalElements;
    };
  }

  // tslint:disable-next-line:typedef
  handleSearchProducts() {
    const searchKeyword: string = this.route.snapshot.paramMap.get('keyword');

    if (this.previousKeyword !== searchKeyword) {
      this.thePageNumber = 1;
    }

    this.previousKeyword = searchKeyword;

    this.productService.getSearchProductsPagination(this.thePageNumber - 1, this.thePageSize, searchKeyword).subscribe(
      data => {
        this.products = data._embedded.products;
        this.thePageNumber = data.page.number + 1;
        this.thePageSize = data.page.size;
        this.theToallElemets = data.page.totalElements;
      }
    );
  }

  // tslint:disable-next-line:typedef
  updatePageSize(pageSize: Event) {
    this.thePageSize = +(pageSize.target as HTMLInputElement).value;
    this.thePageNumber = 1;
    this.getProductList();
  }

  // tslint:disable-next-line:typedef
  adcTocart(product: Product) {
      console.log('Add to cart: ' + product.name + ' ' + product.unitPrice);
  }
}
