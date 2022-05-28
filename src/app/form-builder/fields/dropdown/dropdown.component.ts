import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormData } from '../../../interfaces/form-interface';

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

}
