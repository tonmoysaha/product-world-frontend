import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {CartitemService} from '../../service/cartitem.service';
import {ProductworldformsService} from '../../service/productworldforms.service';
import {Country} from '../../common/country';
import {State} from '../../common/state';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  totallprice: number = 0.0;
  totallQuantity: number = 0;
  checkOutFormBuilder: FormGroup;

  creditCardMonths: number[] = [];
  creditCardyears: number[] = [];
  countries: Country[] = [];
  states: State[] = [];
  country: string;

  constructor(private formBuilder: FormBuilder, private cartService: CartitemService,
              private productFormsService: ProductworldformsService) {
  }

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
        cardType: [''],
        nameOnCard: [''],
        cardNumber: [''],
        securityCode: [''],
        expirationMonth: [''],
        expirationYear: ['']
      })
    });

    this.updateTotall();

    const currentMonth: number = new Date().getMonth() + 1;
    this.productFormsService.getCreditCardsMonths(currentMonth).subscribe(data => {
      console.log('retrieve credit months: ' + JSON.stringify(data));
      this.creditCardMonths = data;
    });

    this.productFormsService.getCreditCardsYears().subscribe(
      data => {
        console.log('retrieve credit Years: ' + JSON.stringify(data));
        this.creditCardyears = data;
      }
    );

    this.productFormsService.getCountries().subscribe(
      data => {
        console.log('retrieve credit Years: ' + JSON.stringify(data));
        this.countries = data;
      }
    )

    
    
    

  }
  //copy value from one form to another
  shippingAddressToBillingAddress(event) {
    if (event.target.checked) {
      this.checkOutFormBuilder.controls.billingAddress.setValue(this.checkOutFormBuilder.controls.shippingAddress.value);
    } else {
      this.checkOutFormBuilder.controls.billingAddress.reset();
    }
  }

  //update totall price in checkout page
  updateTotall() {
    this.cartService.toatallPrice.subscribe(data => this.totallprice = data);
    this.cartService.totallQuantity.subscribe(data => this.totallQuantity = data);
  }

  //handle month from future year
  handleMonthsAndyears() {
    const creditCardFormGroup = this.checkOutFormBuilder.get('creditCard');

    const selectedYear: number = creditCardFormGroup.value.expirationYear;
    const currentYear: number = new Date().getFullYear();

    let startMonth: number;

    if (selectedYear !== currentYear) {
      startMonth = 1;
    }else {
      startMonth = new Date().getMonth()+1;
    }

    this.productFormsService.getCreditCardsMonths(startMonth).subscribe(
      data => {
        this.creditCardMonths = data;
      }
    );

  }
  
  
  onSubmit() {
    console.log(`handling form submission`);
    console.log(this.checkOutFormBuilder.get('customer').value);
    console.log(this.checkOutFormBuilder.get('shippingAddress').value);
    console.log(this.checkOutFormBuilder.get('billingAddress').value);
    console.log(this.checkOutFormBuilder.get('creditCard').value);
  }


}
