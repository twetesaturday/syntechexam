import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormControlData, FormData, FormValidators } from '../interfaces/form-interface';
import { FormService } from '../services/form/form.service';
import { FormControlType } from './form-builder.enum';

@Component({
  selector: 'form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss']
})
export class FormBuilderComponent implements OnInit {
  @Input() formData!: FormControlData;
  @Input() formGroupData!: FormGroup;

  eFormControlType = FormControlType;
  secondFormGroup!: FormGroup;

  constructor(private formService: FormService, private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initializeFormGroups();
    this.getFormData();
  }

  initializeFormGroups() {
    this.formGroupData = this._formBuilder.group({
      stateGroup: '',
    });

    this.secondFormGroup = this._formBuilder.group({
      stateGroup: '',
    });
  }

  getFormData () {
    this.formService.getJSONFormData()
      .subscribe((response: FormControlData) => {
        this.formData = response;
        this.createFormControl();
      })
  }

  createFormControl() {
    this.formData.forEach((element: FormData) => {
      if (element.validators) {
        element.validators.forEach((validator: FormValidators) => {
          this.formGroupData.addControl(element.id, new FormControl('', this._getValidators(validator)));
        })
      } else {
        this.formGroupData.addControl(element.id, new FormControl(''));
      }
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
