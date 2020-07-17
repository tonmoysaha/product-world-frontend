import { Component, OnInit } from '@angular/core';
import {CartitemService} from '../../service/cartitem.service';

@Component({
  selector: 'app-cart-status',
  templateUrl: './cart-status.component.html',
  styleUrls: ['./cart-status.component.css']
})
export class CartStatusComponent implements OnInit {

  totallPrice: number = 0.00;
  totallQuantity: number = 0.00;

  constructor(private cartService: CartitemService) { }

  ngOnInit(): void {
    this.updateCartStatus();
  }

  private updateCartStatus() {
    this.cartService.toatallPrice.subscribe(
      data => {
        this.totallPrice = data;
      }
    );

    this.cartService.totallQuantity.subscribe(
      data => {
        this.totallQuantity = data;
      }
    );

  }
}
