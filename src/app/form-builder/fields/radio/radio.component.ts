import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatRadioChange } from '@angular/material/radio';
import { FormCustomAnswer, FormData } from '../../../interfaces/form-interface';
import { FormValidators } from '../../form-builder.enum';

@Component({
  selector: 'radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss']
})
export class RadioComponent {
  @Input() control!: FormData;
  @Input() form!: FormGroup;
  @Output() selectedRadioValue = new EventEmitter<object>();

  hasCustomAnswer = false;
  optionLabel!: string;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  customAnswers: FormCustomAnswer[] = [];

  get isValid() { return this.form.controls[this.control.id].valid; }
  get isDirty () { return this.form.controls[this.control.id].dirty; }
  get isTouched() { return this.form.controls[this.control.id].touched; }
  
  constructor() {}


  onRadioChange(event: MatRadioChange) {
    let selected = event.value;

    this.selectedRadioValue.emit({
      selectedValue: selected,
      control: this.control
    });

    this.optionLabel = selected;
    this.hasCustomAnwerChecker(selected);
  }

  hasCustomAnwerChecker(selected: string) {
    this.control.options?.forEach((option) => {
      if (selected === option.key) {
        if (option.customAnswer) {
          this.hasCustomAnswer = true;
        } else {
          this.hasCustomAnswer = false;
        }
      }
    })
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      const parsedValue = value.toLowerCase().replace(/ +/g, "");
      const hasExistingValue = this.control.options?.find((option) => {
        const parsedOptionLabel = option.label.toLowerCase().replace(/ +/g, "");
        return parsedValue === parsedOptionLabel;
      });
      
      if (hasExistingValue === undefined) {
        this.customAnswers.push({value: value});
    
        this.form.controls[this.control.id].setValue(this.customAnswers);
      }
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(customAnswer: FormCustomAnswer): void {
    const index = this.customAnswers.indexOf(customAnswer);

    if (index >= 0) {
      this.customAnswers.splice(index, 1);
    }
  }

  getErrorMessage() {
    let errorMesage = '';
    this.control.validators.forEach((validator) => {
      const validators: string[] = Object.keys(validator);
      
      validators.forEach((validatorStr) => {
        switch(validatorStr) {
          case FormValidators.Required:
            errorMesage = `${this.control.label} is required!`;
            break;
          case FormValidators.MinLength:
            errorMesage = `${this.control.label} should be at least 10 characters`
            break;
          case FormValidators.Email:
            errorMesage = `${this.control.label} is not a valid email`
            break;
        }
      })
    })
    return errorMesage;
  }
}
