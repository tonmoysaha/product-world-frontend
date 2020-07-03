import { Injectable } from '@angular/core';
import {CartItem} from '../common/cart-item';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartitemService {

  cartItems: CartItem[] = [];

  toatallPrice: Subject<number> = new Subject<number>();
  totallQuantity: Subject<number> = new Subject<number>();

  constructor() { }


  addTocart(cartItem: CartItem){

    let alreadytExistInCart: boolean = false;

    let existingCartItem: CartItem = undefined;

    if (this.cartItems.length > 0) {
      for (let tempCartItem of this.cartItems){
          if (cartItem.id === tempCartItem.id){
            existingCartItem = tempCartItem;
            break;
          }
      }
      alreadytExistInCart = (existingCartItem !== undefined);
    }
    if (alreadytExistInCart){
      existingCartItem.quantity++;
    }else {
      this.cartItems.push(cartItem);
    }

    this.computeCartTotalls();
  }


  private computeCartTotalls() {
    
  }
}
