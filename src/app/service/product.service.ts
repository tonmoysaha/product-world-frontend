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

  getProductListPaginate(thePage: number, thePageSize: number, currentCategoryId: number): Observable<GetResponseProducts> {

    const searchCategory = `${this.baseUrl}/products/search/findByCategoryId?id=${currentCategoryId}`
                            + `&page=${thePage}&size=${thePageSize}`;
    return this.httpClient.get<GetResponseProducts>(searchCategory);
  }


  getProductCategories(): Observable<ProductCategory[]> {
    const getCategory = `${this.baseUrl}/product-category`;
    return this.httpClient.get<GetCategoryResponse>(getCategory).pipe(
      map(response => response._embedded.productCategory)
    );

  }

  getSearchProductsPagination(thePage: number, thePageSize: number, searchKeyword: string): Observable<GetResponseProducts> {
    const searchProductUrl = `${this.baseUrl}/products/search/findByNameContainingIgnoreCase?name=${searchKeyword}`
      + `&page=${thePage}&size=${thePageSize}`;
    return this.httpClient.get<GetResponseProducts>(searchProductUrl);
  }

  getProduct(productId: number): Observable<Product> {
    const getProductUrl = `${this.baseUrl}/products/${productId}`;
    return this.httpClient.get<Product>(getProductUrl);
  }
}

interface GetResponseProducts {
  _embedded: {
    products: Product[];
  };
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
}

interface GetCategoryResponse {
  _embedded: {
    productCategory: ProductCategory[];
  };
}
