import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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

  stateGroups: FormOptionsGroup[] = [];
  stateGroupOptions!: Observable<FormOptionsGroup[]>;

  get isValid() { return this.form.controls[this.control.id].valid; }
  get isDirty () { return this.form.controls[this.control.id].dirty; }
  get isTouched() { return this.form.controls[this.control.id].touched; }

  constructor(private _formBuilder: FormBuilder) { }

  ngOnInit() {
    this._setStateGroups(this.control);

    this.stateGroupOptions = this.form.get('stateGroup')!.valueChanges.pipe(
      startWith(""),
      map(value => this._filterGroup(value))
    );
  }

  private _filterGroup(value: string): FormOptionsGroup[] {
    if (value) {
      return this.stateGroups
        .map(group => ({key: group.key, names: _filter(group.names, value)}))
        .filter(group => group.names.length > 0);
    }

    return this.stateGroups;
  }

  private _setStateGroups(element: FormData) {
    if (element.type === 'autocomplete') {
      this.stateGroups = element.optionsGroup!;
    }
  }
}
