import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormControlData, FormData, FormValidators, Vitamins } from '../interfaces/form-interface';
import { FormService } from '../services/form/form.service';
import { EFormSections, EFormValidators, EUserClassification } from './form-builder.enum';

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

  eFormSections = EFormSections;

  totalPoints: number = 0;
  isNovice!: boolean;
  isCompetent!: boolean;
  isExpert!: boolean;
  userName!: any;
  vitamins!: Vitamins;
  userVitamins!: Vitamins;
  classification!: string;

  constructor(private formService: FormService, private _formBuilder: FormBuilder) { }
  
  ngOnInit() {
    this.initializeFormGroups();
    this.getFormData();
    this.getVitaminData();
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

  getVitaminData () {
    this.formService.getJSONVitaminData()
      .subscribe((response: Vitamins) => {
        this.vitamins = response;
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
      case EFormSections.Basics:
        this.basicsFormGroup.addControl(element.id, new FormControl('', this._getValidators(validator)));
        break;
      case EFormSections.Goals:
        this.goalsFormGroup.addControl(element.id, new FormControl('', this._getValidators(validator)));
        break;
      case EFormSections.Diet:
        this.dietFormGroup.addControl(element.id, new FormControl('', this._getValidators(validator)));
        break;
      case EFormSections.Lifestyle:
        this.lifestyleFormGroup.addControl(element.id, new FormControl('', this._getValidators(validator)));
        break;
    }
  }

  onNextButtonClick(formGroup: FormGroup, isFinal?: boolean) {
    this._getPoints(formGroup);
    this._getUserName(formGroup);

    if (isFinal) {
      this._getClassification();
      this._getVitamins();
    }
  }

  private _getClassification() {
    if (this.totalPoints) {
      this.isNovice = this.totalPoints > 0 && this.totalPoints < 40;
      this.isCompetent = this.totalPoints > 40 && this.totalPoints < 80;
      this.isExpert = this.totalPoints > 80 && this.totalPoints < 150;

      if (this.isNovice) {
        this.classification = EUserClassification.Novice;
      } else if (this.isCompetent) {
        this.classification = EUserClassification.Competent;
      } else if (this.isExpert) {
        this.classification = EUserClassification.Expert;
      }
    }
  }

  private _getVitamins() {
    if (this.classification) {
      this.userVitamins = this.vitamins.filter(vitamin => this.classification.toLowerCase() == vitamin.classification);
    }
  }

  private _getUserName(formGroup: FormGroup) {
    Object.entries(formGroup.value).forEach(entry => {
      const [key, value] = entry;
        if (key === 'first_name') {
          this.userName = value;
        }
    })
  }

  private _getPoints(formGroup: FormGroup) {
    Object.entries(formGroup.value).forEach(entry => {
      const [key, value] = entry;
      
      this.formData.forEach((formEl: FormData) => {
        if (key === formEl.id) {
          if (formEl.options) {
            formEl.options.forEach((option) => {
              if (value === option.key) {
                if (option.points) {
                  this.totalPoints += option.points;
                }
              }
            })
          }
        }
      });
    })
  }

  private _getValidators(validator: FormValidators): any {
    const validatorsToAdd: any = [];

    Object.entries(validator).forEach(entry => {
      const [key, value] = entry;

      switch (key) {
        case EFormValidators.Required:
          if (value) {
            validatorsToAdd.push(Validators.required);
          }
        break;
        case EFormValidators.MinLength:
          validatorsToAdd.push(Validators.minLength(value));
          break;
        case EFormValidators.Email:
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
