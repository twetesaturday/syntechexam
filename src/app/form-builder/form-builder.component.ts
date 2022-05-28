import { HttpClient } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { FormControlData, FormData, FormValidators } from '../form-interface';
import { FormControlType } from './form-builder.enum';
import {BreakpointObserver} from '@angular/cdk/layout';
import {map} from 'rxjs/operators';

@Component({
  selector: 'form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss']
})
export class FormBuilderComponent implements OnInit {
  @Input() formData!: FormControlData;
  @Input() formGroupData!: FormGroup;

  eFormControlType = FormControlType;

  constructor(private httpClient: HttpClient, private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.formGroupData = this._formBuilder.group({
      stateGroup: '',
    });

    this.httpClient
      .get<FormControlData>('/assets/formData.json')
      .subscribe((data: FormControlData) => {
        this.formData = data;
        this.createFormControl();
      })

  }

  createFormControl() {
    this.formData.forEach((element: FormData) => {
      element.validators.forEach((validator: FormValidators) => {
        this.formGroupData.addControl(element.id, new FormControl('', this._getValidators(validator)));
      })
    });
  }

  private _getValidators(validator: FormValidators): any {
    const validatorsToAdd: any = [];

    Object.entries(validator).forEach(entry => {
      const [key, value] = entry;

      switch (key) {
        case 'required':
          if (value) {
            validatorsToAdd.push(Validators.required);
          }
        break;
        case 'minLength':
          validatorsToAdd.push(Validators.minLength(value));
          break;
        case 'email':
          if (value) {
            validatorsToAdd.push(Validators.email);
          }
        break;
        default:
          break;
      }
    })

    return validatorsToAdd;
  }
}
