import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatRadioChange } from '@angular/material/radio';
import { FormCustomAnswer, FormData } from '../../../form-interface';

@Component({
  selector: 'radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss']
})
export class RadioComponent {
  @Input() control!: FormData;
  @Input() form!: FormGroup;

  isOthersSelected = false;
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  customAnswers: FormCustomAnswer[] = [];

  get isValid() { return this.form.controls[this.control.id].valid; }
  get isDirty () { return this.form.controls[this.control.id].dirty; }
  get isTouched() { return this.form.controls[this.control.id].touched; }
  
  constructor() {}


  onRadioChange(event: MatRadioChange) {
    let selected = event.value;

    if (selected === 'others') {
      this.isOthersSelected = true;
    } else {
      this.isOthersSelected = false;
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.customAnswers.push({value: value});
      
      this.form.controls['hobbies'].setValue(this.customAnswers);
    }

    // Clear the input value
    if (event.input) {
      event.input.value = '';
    }
  }

  remove(customAnswer: FormCustomAnswer): void {
    const index = this.customAnswers.indexOf(customAnswer);

    if (index >= 0) {
      this.customAnswers.splice(index, 1);
    }
  }
}
