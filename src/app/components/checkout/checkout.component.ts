import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
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
              private productFormsService: ProductworldformsService) {
  }

  ngOnInit(): void {

    this.updateTotal();

    this.checkOutFormBuilder = this.formBuilder.group({
      customer: this.formBuilder.group({
        firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
        lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
        email: new FormControl('', [Validators.required,
                                                            Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])
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
    }else {
      startMonth = new Date().getMonth()+1;
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
        }else {
          this.billingStates = data;
        }

        formGroup.get('state').setValue(data[0]);
      }

    )

  }

  
  get firstName(){return this.checkOutFormBuilder.get('customer.firstName');}
  get lastName(){return this.checkOutFormBuilder.get('customer.lastName');}
  get email(){return this.checkOutFormBuilder.get('customer.email');}



  onSubmit() {

    if (this.checkOutFormBuilder.invalid){
      return this.checkOutFormBuilder.markAllAsTouched();
    }
    console.log(`handling form submission`);
    console.log(this.checkOutFormBuilder.get('customer').value);
    console.log(this.checkOutFormBuilder.get('shippingAddress').value);
    console.log(this.checkOutFormBuilder.get('billingAddress').value);
    console.log(this.checkOutFormBuilder.get('creditCard').value);
    console.log(this.totallPrice + " " + this.totallQuantity);

  }

}
