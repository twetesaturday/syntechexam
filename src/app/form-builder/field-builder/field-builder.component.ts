import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormData } from '../../interfaces/form-interface';
import { EFormControlType, EFormSections } from '../form-builder.enum';

@Component({
  selector: 'field-builder',
  templateUrl: './field-builder.component.html',
  styleUrls: ['./field-builder.component.scss']
})
export class FieldBuilderComponent {
  @Input() control!: FormData;
  @Input() form!: FormGroup;
  
  eFormControlType = EFormControlType;
  eFormSections = EFormSections;
  
  totalPoints: number = 0;

  constructor() { }

  onRadioValueSelect(event: any) {
    // TODO: Count points on next button
    // console.log('SELECTED RADIO VALUE', event);
    const selectedValue = event.selectedValue;
    const control = event.control;
    if (event) {
       const selectedOption = control.options.find((option: any) => option.key === selectedValue);
      //  console.log('HELLO', selectedOption.points);
       if (selectedOption.points) {
        this.totalPoints += selectedOption.points;
       }
    }
    // console.log('TOTAL POINTS', this.totalPoints);
  }

}
