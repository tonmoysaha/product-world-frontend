import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../common/product';
import {map} from 'rxjs/operators';
import {ProductCategory} from '../common/product-category';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private baseUrl = 'http://localhost:8080/api';

  constructor(private httpClient: HttpClient) {
  }

  getProductList(currentCategoryId: number): Observable<Product[]> {

    const searchCategory = `${this.baseUrl}/products/search/findByCategoryId?id=${currentCategoryId}`;
    return this.httpClient.get<GetResponse>(searchCategory).pipe(
      map(response => response._embedded.products)
    );
  }

  getProductCategories(): Observable<ProductCategory[]> {
    const getCategory = `${this.baseUrl}/product-category`;
    return this.httpClient.get<GetCategoryResponse>(getCategory).pipe(
      map(response => response._embedded.productCategory)
    );

  }

  getSearchProducts(searchKeyword: string): Observable<Product[]> {
    const searchProductUrl = `${this.baseUrl}/products/search/findByNameContainingIgnoreCase?name=${searchKeyword}`;
    return this.httpClient.get<GetResponse>(searchProductUrl).pipe(
      map(response => response._embedded.products)
    );
  }

  getProduct(productId: number): Observable<Product> {
    const getProductUrl = `${this.baseUrl}/products/${productId}`;
    return this.httpClient.get<Product>(getProductUrl);
  }
}

interface GetResponse {
  _embedded: {
    products: Product[];
  };
}

interface GetCategoryResponse {
  _embedded: {
    productCategory: ProductCategory[];
  };
}
