import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatChipInputEvent } from '@angular/material/chips';
import { Observable } from 'rxjs/internal/Observable';
import { map, startWith } from 'rxjs/operators';
import { FormData, FormOptionsGroup } from '../../../interfaces/form-interface';

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
  filteredFruits: Observable<string[]>;
  fruitCtrl = new FormControl();
  fruits: string[] = ['Lemon'];
  allFruits: string[] = ['Apple', 'Lemon', 'Lime', 'Orange', 'Strawberry'];

  @ViewChild('fruitInput') fruitInput!: ElementRef<HTMLInputElement>;
  
  get isValid() { return this.form.controls[this.control.id].valid; }
  get isDirty () { return this.form.controls[this.control.id].dirty; }
  get isTouched() { return this.form.controls[this.control.id].touched; }
  
  constructor() {
    this.filteredFruits = this.form.controls[this.control.id].valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => fruit ? this._filter(fruit) : this.allFruits.slice()));
  }

  ngOnInit() {
    this._setAutocompleteGroups(this.control);

    this.autocompleteGroupOptions = this.form.get(this.control.id)!.valueChanges.pipe(
      startWith(""),
      map(value => this._filterGroup(value))
    );
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.fruits.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.form.controls.id.setValue(null);
  }

  remove(name: string): void {
    const index = this.fruits.indexOf(name);

    if (index >= 0) {
      this.autocompleteGroups.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.fruits.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.form.controls[this.control.id].setValue(null);
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

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allFruits.filter(fruit => fruit.toLowerCase().includes(filterValue));
  }
}
