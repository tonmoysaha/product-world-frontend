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

      // for (let tempCartItem of this.cartItems){
      //     if (cartItem.id === tempCartItem.id){
      //       existingCartItem = tempCartItem;
      //       break;
      //     }
      // }

      existingCartItem = this.cartItems.find(tempCartItem => (tempCartItem.id === cartItem.id));

      alreadytExistInCart = (existingCartItem !== undefined);
    }
    if (alreadytExistInCart){
      existingCartItem.quantity++;
    }else {
      this.cartItems.push(cartItem);
    }

    this.computeCartTotalls();
  }


   computeCartTotalls() {
    let totallPriceValue: number = 0;
    let totallQuantity: number = 0;

    for (let cartItem of this.cartItems){
      totallPriceValue += cartItem.quantity * cartItem.unitPrice;
      totallQuantity += cartItem.quantity;
    }

    this.toatallPrice.next(totallPriceValue);
    this.totallQuantity.next(totallQuantity);

    this.logCartData(totallPriceValue, totallQuantity);
  }

  private logCartData(totallPriceValue: number, totallQuantity: number) {

    console.log(`Content of cart item: `);

    for (let tempCartItem of this.cartItems){
      const subTotallPrice = tempCartItem.quantity * tempCartItem.unitPrice;
      console.log(`Item Name: ${tempCartItem.name} , Quantity: ${tempCartItem.quantity} , Item Price: ${tempCartItem.unitPrice}
       , Item Subtotall: ${subTotallPrice}`);
    }

    console.log(`Totall Price: ${totallPriceValue.toFixed(2)} , Totall Quantity: ${totallQuantity}`);
  }
}
