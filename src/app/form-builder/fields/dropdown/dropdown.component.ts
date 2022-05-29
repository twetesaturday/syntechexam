import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormData } from '../../../interfaces/form-interface';
import { EFormValidators } from '../../form-builder.enum';

@Component({
  selector: 'dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent {
  @Input() control!: FormData;
  @Input() form!: FormGroup;

  get isValid() { return this.form.controls[this.control.id].valid; }
  get isDirty () { return this.form.controls[this.control.id].dirty; }
  get isTouched() { return this.form.controls[this.control.id].touched; }
  
  constructor() { }

  getErrorMessage() {
    let errorMesage = '';
    this.control.validators.forEach((validator) => {
      const validators: string[] = Object.keys(validator);
      
      validators.forEach((validatorStr) => {
        switch(validatorStr) {
          case EFormValidators.Required:
            errorMesage = `${this.control.label} is required!`;
            break;
          case EFormValidators.MinLength:
            errorMesage = `${this.control.label} should be at least 10 characters`
            break;
          case EFormValidators.Email:
            errorMesage = `${this.control.label} is not a valid email`
            break;
        }
      })
    })
    return errorMesage;
  }
}
