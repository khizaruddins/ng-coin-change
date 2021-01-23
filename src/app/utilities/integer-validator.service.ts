import { FormControl } from '@angular/forms';
import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class IntegerValidatorService {

  public isInteger = (control: FormControl) => {
    return checkIfValueIsInt(control.value) ? null : {
      notNumeric: true
    }
  }

}

function checkIfValueIsInt(value) {
  return ((parseFloat(value) == parseInt(value)) && !isNaN(value));
}