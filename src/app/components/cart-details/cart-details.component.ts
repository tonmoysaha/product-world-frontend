import { Component, OnInit } from '@angular/core';
import {CartItem} from '../../common/cart-item';
import {CartitemService} from '../../service/cartitem.service';

@Component({
  selector: 'app-cart-details',
  templateUrl: './cart-details.component.html',
  styleUrls: ['./cart-details.component.css']
})
export class CartDetailsComponent implements OnInit {

  cartItems: CartItem[] = [];
  totallPrice: number = 0.0;
  toallQuantity: number = 0.0;

  constructor(private cartService: CartitemService) { }

  ngOnInit(): void {
    this.listCartDetails();
  }

  private listCartDetails() {

    this.cartItems = this.cartService.cartItems;

    this.cartService.toatallPrice.subscribe( data => this.totallPrice = data);

    this.cartService.totallQuantity.subscribe(data => this.toallQuantity = data);

    this.cartService.computeCartTotalls();
  }

  incrementQantity(cartItem: CartItem) {
    this.cartService.addTocart(cartItem);
  }

  decrementQuantity(cartItem: CartItem) {
    this.cartService.decrementItemQuantity(cartItem);
  }

  removeItem(cartItem: CartItem) {
    this.cartService.remove(cartItem);
  }
}
