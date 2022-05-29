import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { map, startWith } from 'rxjs/operators';
import { FormData, FormOptionsGroup } from '../../../interfaces/form-interface';
import { FormValidators } from '../../form-builder.enum';

export const _filter = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();

  return opt.filter(item => item.toLowerCase().includes(filterValue));
};

@Component({
  selector: 'autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent implements OnInit {
  @Input() control!: FormData;
  @Input() form!: FormGroup;

  autocompleteGroups: FormOptionsGroup[] = [];
  autocompleteGroupOptions!: Observable<FormOptionsGroup[]>;

  selectable = true;
  removable = true;
  separatorKeysCodes: number[] = [ENTER, COMMA];
  
  get isValid() { return this.form.controls[this.control.id].valid; }
  get isDirty () { return this.form.controls[this.control.id].dirty; }
  get isTouched() { return this.form.controls[this.control.id].touched; }

  constructor() { }

  ngOnInit() {
    this._setAutocompleteGroups(this.control);

    this.autocompleteGroupOptions = this.form.get(this.control.id)!.valueChanges.pipe(
      startWith(""),
      map(value => this._filterGroup(value))
    );
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

  private _filterGroup(value: string): FormOptionsGroup[] {
    if (value) {
      return this.autocompleteGroups
        .map(group => ({key: group.key, names: _filter(group.names, value)}))
        .filter(group => group.names.length > 0);
    }
    
    return this.autocompleteGroups;
  }

  private _setAutocompleteGroups(element: FormData) {
    if (element.type === 'autocomplete') {
      this.autocompleteGroups = element.optionsGroup!;
    }
  }
}
