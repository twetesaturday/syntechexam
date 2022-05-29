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
}
