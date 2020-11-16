import {FormControl, ValidationErrors} from '@angular/forms';

export class CustomValidators {

  //White Space validation
  static notOnlyWhiteSpace(form: FormControl): ValidationErrors {
    if ((form.value != null) && (form.value.trim().length === 0)) {
      return {'notOnlyWhiteSpace': true};
    } else {
      return null;
    }
  }
}
