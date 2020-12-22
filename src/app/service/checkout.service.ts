import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Purchase} from '../common/purchase';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  private URl_PURCHASE = `http://localhost:8080/api/checkout/purchase`

  constructor(private httpClient: HttpClient) { }

  placeOrder(purchase: Purchase): Observable<any>{

    return this.httpClient.post<Purchase>(this.URl_PURCHASE, purchase);

  }
}
