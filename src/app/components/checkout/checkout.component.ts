import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CartitemService} from '../../service/cartitem.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  totallprice: number = 0.0;
  totallQuantity: number = 0;
  checkOutFormBuilder: FormGroup;

  constructor(private formBuilder: FormBuilder , private cartService: CartitemService) { }

  ngOnInit(): void {

    this.checkOutFormBuilder = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: [''],
        lastName: [''],
        email: ['']
      }),

      shippingAddress: this.formBuilder.group({
        country: [''],
        street: [''],
        city: [''],
        state: [''],
        zipCode: ['']
      }),

      billingAddress: this.formBuilder.group({
        country: [''],
        street: [''],
        city: [''],
        state: [''],
        zipCode: ['']
      }),
      
      creditCard: this.formBuilder.group({
        cardType:[''],
        nameOnCard:[''],
        cardNumber:[''],
        securityCode:[''],
        expirationMonth:[''],
        expirationYear:['']
      })

    });

    this.updateTotall()

  }

  shippingAddressToBillingAddress(event) {
    if (event.target.checked) {
      this.checkOutFormBuilder.controls.billingAddress.setValue(this.checkOutFormBuilder.controls.shippingAddress.value);
    }else {
      this.checkOutFormBuilder.controls.billingAddress.reset();
    }
  }

  updateTotall(){
    this.cartService.toatallPrice.subscribe(data => this.totallprice = data);
    this.cartService.totallQuantity.subscribe(data => this.totallQuantity = data);
  }


  onSubmit() {
    console.log(`handling form submission`);
    console.log(this.checkOutFormBuilder.get('customer').value);
    console.log(this.checkOutFormBuilder.get('shippingAddress').value);
    console.log(this.checkOutFormBuilder.get('billingAddress').value);
    console.log(this.checkOutFormBuilder.get('creditCard').value);
  }

}
