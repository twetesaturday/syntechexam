import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatRadioChange } from '@angular/material/radio';
import { FormCustomAnswer, FormData } from '../../../interfaces/form-interface';

@Component({
  selector: 'radio',
  templateUrl: './radio.component.html',
  styleUrls: ['./radio.component.scss']
})
export class RadioComponent {
  @Input() control!: FormData;
  @Input() form!: FormGroup;
  @Output() selectedRadioValue = new EventEmitter<object>();

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

    this.selectedRadioValue.emit({
      selectedValue: selected,
      control: this.control
    });

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
      
      this.form.controls[this.control.id].setValue(this.customAnswers);
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
}
