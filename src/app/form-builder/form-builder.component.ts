import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormControlData, FormData, FormValidators } from '../interfaces/form-interface';
import { FormService } from '../services/form/form.service';
import { FormSections } from './form-builder.enum';

@Component({
  selector: 'form-builder',
  templateUrl: './form-builder.component.html',
  styleUrls: ['./form-builder.component.scss']
})
export class FormBuilderComponent implements OnInit {
  @Input() formData!: FormControlData;
  @Input() basicsFormGroup!: FormGroup;
  @Input() goalsFormGroup!: FormGroup;
  @Input() dietFormGroup!: FormGroup;
  @Input() lifestyleFormGroup!: FormGroup;

  eFormSections = FormSections;

  constructor(private formService: FormService, private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this.initializeFormGroups();
    this.getFormData();
  }

  initializeFormGroups() {
    this.basicsFormGroup = this._formBuilder.group({});

    this.goalsFormGroup = this._formBuilder.group({});

    this.dietFormGroup = this._formBuilder.group({});

    this.lifestyleFormGroup = this._formBuilder.group({});
  }

  getFormData () {
    this.formService.getJSONFormData()
      .subscribe((response: FormControlData) => {
        this.formData = response;
        this.createFormControl(response);
      })
  }

  createFormControl(formData: FormControlData) {
    formData.forEach((element: FormData) => {
      if (element.validators) {
        element.validators.forEach((validator: FormValidators) => {
          this.createFormControlWithValidators(element, validator);
        })
      }
    });
  }

  createFormControlWithValidators(element: FormData, validator: FormValidators) {
    switch(element.section) {
      case FormSections.Basics:
        this.basicsFormGroup.addControl(element.id, new FormControl('', this._getValidators(validator)));
        break;
      case FormSections.Goals:
        this.goalsFormGroup.addControl(element.id, new FormControl('', this._getValidators(validator)));
        break;
      case FormSections.Diet:
        this.dietFormGroup.addControl(element.id, new FormControl('', this._getValidators(validator)));
        break;
      case FormSections.Lifestyle:
        this.lifestyleFormGroup.addControl(element.id, new FormControl('', this._getValidators(validator)));
        break;
    }
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
