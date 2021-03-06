import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {CartitemService} from '../../service/cartitem.service';
import {ProductworldformsService} from '../../service/productworldforms.service';
import {Country} from '../../common/country';
import {State} from '../../common/state';
import {CustomValidators} from '../../validator/custom-validators';
import {Order} from '../../common/order';
import {OrderItem} from '../../common/order-item';
import {map} from 'rxjs/operators';
import {Purchase} from '../../common/purchase';
import {CheckoutService} from '../../service/checkout.service';
import {error} from 'selenium-webdriver';
import {Router} from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  checkOutFormBuilder: FormGroup;

  totallPrice: number = 0.00;
  totallQuantity: number = 0.00;
  creditCardMonths: number[] = [];
  creditCardyears: number[] = [];
  countries: Country[] = [];
  shippingStates: State[] = [];
  billingStates: State[] = [];


  constructor(private formBuilder: FormBuilder,
              private cartService: CartitemService,
              private productFormsService: ProductworldformsService,
              private checkOutService: CheckoutService,
              private router: Router) {
  }

  ngOnInit(): void {

    this.updateTotal();

    this.checkOutFormBuilder = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: new FormControl('', [Validators.required, Validators.minLength(2), CustomValidators.notOnlyWhiteSpace]),
        lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
        email: new FormControl('', [Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])
      }),
      shippingAddress: this.formBuilder.group({
        country: new FormControl('', [Validators.required]),
        street: new FormControl('', [Validators.required, Validators.minLength(2), CustomValidators.notOnlyWhiteSpace]),
        city: new FormControl('', [Validators.required, Validators.minLength(2), CustomValidators.notOnlyWhiteSpace]),
        state: new FormControl('', [Validators.required]),
        zipCode: new FormControl('', [Validators.required, Validators.minLength(2), CustomValidators.notOnlyWhiteSpace])
      }),

      billingAddress: this.formBuilder.group({
        country: new FormControl('', [Validators.required]),
        street: new FormControl('', [Validators.required, Validators.minLength(2), CustomValidators.notOnlyWhiteSpace]),
        city: new FormControl('', [Validators.required, Validators.minLength(2), CustomValidators.notOnlyWhiteSpace]),
        state: new FormControl('', [Validators.required]),
        zipCode: new FormControl('', [Validators.required, Validators.minLength(2), CustomValidators.notOnlyWhiteSpace])
      }),

      creditCard: this.formBuilder.group({
        cardType: new FormControl('', [Validators.required, CustomValidators.notOnlyWhiteSpace]),
        nameOnCard: new FormControl('', [Validators.required, CustomValidators.notOnlyWhiteSpace]),
        cardNumber: new FormControl('', [Validators.required, Validators.pattern('[0-9]{16}'), CustomValidators.notOnlyWhiteSpace]),
        securityCode: new FormControl('', [Validators.required, Validators.pattern('[0-9]{3}'), CustomValidators.notOnlyWhiteSpace]),
        expirationMonth: new FormControl('', [Validators.required]),
        expirationYear: new FormControl('', [Validators.required])
      })
    });

    //Get Credit Card months
    const currentMonth: number = new Date().getMonth() + 1;
    this.productFormsService.getCreditCardsMonths(currentMonth).subscribe(data => {
      console.log('retrieve credit months: ' + JSON.stringify(data));
      this.creditCardMonths = data;
    });

    //Get Credit Card Years
    this.productFormsService.getCreditCardsYears().subscribe(
      data => {
        console.log('retrieve credit Years: ' + JSON.stringify(data));
        this.creditCardyears = data;
      }
    );

    //Get Countries
    this.productFormsService.getCountries().subscribe(
      data => {
        console.log('retrieve credit Years: ' + JSON.stringify(data));
        this.countries = data;
      }
    );

  }

  //Form details to check validation
  get firstName() {
    return this.checkOutFormBuilder.get('customer.firstName');
  }

  get lastName() {
    return this.checkOutFormBuilder.get('customer.lastName');
  }

  get email() {
    return this.checkOutFormBuilder.get('customer.email');
  }

  //shipping
  get country() {
    return this.checkOutFormBuilder.get('shippingAddress.country');
  }

  get street() {
    return this.checkOutFormBuilder.get('shippingAddress.street');
  }

  get city() {
    return this.checkOutFormBuilder.get('shippingAddress.city');
  }

  get state() {
    return this.checkOutFormBuilder.get('shippingAddress.state');
  }

  get zipCode() {
    return this.checkOutFormBuilder.get('shippingAddress.zipCode');
  }

  //Billing address
  get billingAddressCountry() {
    return this.checkOutFormBuilder.get('billingAddress.country');
  }

  get billingAddressStreet() {
    return this.checkOutFormBuilder.get('billingAddress.street');
  }

  get billingAddressCity() {
    return this.checkOutFormBuilder.get('billingAddress.city');
  }

  get billingAddressState() {
    return this.checkOutFormBuilder.get('billingAddress.state');
  }

  get billingAddressZipCode() {
    return this.checkOutFormBuilder.get('billingAddress.zipCode');
  }

  //Credit Card
  get creditCardType() {
    return this.checkOutFormBuilder.get('creditCard.cardType');
  }

  get creditCardname() {
    return this.checkOutFormBuilder.get('creditCard.nameOnCard');
  }

  get creditCardNumber() {
    return this.checkOutFormBuilder.get('creditCard.cardNumber');
  }

  get creditCardSecurityCode() {
    return this.checkOutFormBuilder.get('creditCard.securityCode');
  }

  get creditCardexpirationMonth() {
    return this.checkOutFormBuilder.get('creditCard.expirationMonth');
  }

  get creditCardexpirationYear() {
    return this.checkOutFormBuilder.get('creditCard.expirationYear');
  }


  //copy value from one form to another
  shippingAddressToBillingAddress(event) {
    if (event.target.checked) {
      this.checkOutFormBuilder.controls.billingAddress.setValue(this.checkOutFormBuilder.controls.shippingAddress.value);
      //bug fix
      this.billingStates = this.shippingStates;
    } else {
      this.checkOutFormBuilder.controls.billingAddress.reset();
      //bug fix
      this.billingStates = [];
    }
  }

  //update totall price in checkout page
  updateTotal() {
    this.cartService.toatallPrice.subscribe(
      data => this.totallPrice = data
    );
    this.cartService.totallQuantity.subscribe(
      data => this.totallQuantity = data
    );
  }

  //handle month from future year
  handleMonthsAndyears() {
    const creditCardFormGroup = this.checkOutFormBuilder.get('creditCard');
    const selectedYear: number = creditCardFormGroup.value.expirationYear;
    const currentYear: number = new Date().getFullYear();
    let startMonth: number;

    if (selectedYear !== currentYear) {
      startMonth = 1;
    } else {
      startMonth = new Date().getMonth() + 1;
    }

    this.productFormsService.getCreditCardsMonths(startMonth).subscribe(
      data => {
        this.creditCardMonths = data;
      }
    );
  }

  //Get all the states
  getStates(formGroupName: string) {
    const formGroup = this.checkOutFormBuilder.get(formGroupName);
    const countryCode = formGroup.value.country.code;

    this.productFormsService.getStates(countryCode).subscribe(
      data => {
        if (formGroupName === 'shippingAddress') {
          this.shippingStates = data;
        } else {
          this.billingStates = data;
        }
        formGroup.get('state').setValue(data[0]);
      }
    );
  }

  //SUbmit form button
  onSubmit() {
    if (this.checkOutFormBuilder.invalid) {
      return this.checkOutFormBuilder.markAllAsTouched();
    }

    let order = new Order();
    order.totalPrice = this.totallPrice;
    order.totalQuantity = this.totallQuantity;

    let orderItems: OrderItem[] = this.cartService.cartItems.map(tempCartItem => new OrderItem(tempCartItem));


    let purchase = new Purchase();

    purchase.customer = this.checkOutFormBuilder.controls['customer'].value;

    purchase.shippingAddress = this.checkOutFormBuilder.controls['shippingAddress'].value;
    const shippingState: State = JSON.parse(JSON.stringify(purchase.shippingAddress.state));
    const shippingCountry: Country = JSON.parse(JSON.stringify(purchase.shippingAddress.country));
    purchase.shippingAddress.state = shippingState.name;
    purchase.shippingAddress.country = shippingCountry.name;

    purchase.billingAddress = this.checkOutFormBuilder.controls['billingAddress'].value;
    const billingState: State = JSON.parse(JSON.stringify(purchase.billingAddress.state));
    const billingCountry: Country = JSON.parse(JSON.stringify(purchase.billingAddress.country));
    purchase.billingAddress.state = billingState.name;
    purchase.billingAddress.country = billingCountry.name;

    purchase.orderItems = orderItems;
    purchase.order = order;


    this.checkOutService.placeOrder(purchase).subscribe({
        next: response => {
          alert(`your Order Successfully recived ${response}`);
          this.resetCart();
        },
        error: err => {
          alert(`there wan an error: ${err.message}`);
        }
      }
    );
  }

  private resetCart() {
    this.cartService.cartItems = [];
    this.cartService.totallQuantity.next(0);
    this.cartService.toatallPrice.next(0);

    this.checkOutFormBuilder.reset();

    this.router.navigateByUrl("/products");
  }
}

/*
console.log(`handling form submission`);
    console.log(this.checkOutFormBuilder.get('customer').value);
    console.log(this.checkOutFormBuilder.get('shippingAddress').value);
    console.log(this.checkOutFormBuilder.get('billingAddress').value);
    console.log(this.checkOutFormBuilder.get('creditCard').value);
    console.log(this.totallPrice + " " + this.totallQuantity);

    let cartItems = this.cartService.cartItems;
    let orders: OrderItem[] =[];
    for(let i = 0; i< cartItems.length; i++){
      orders[i] = new OrderItem(cartItems[i]);
    }
 */
