import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextBoxComponent } from './fields/text-box/text-box.component';
import { FormBuilderComponent } from './form-builder.component';
import { AngularMaterialModule } from '../angular-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DateComponent } from './fields/date/date.component';
import { RadioComponent } from './fields/radio/radio.component';
import { DropdownComponent } from './fields/dropdown/dropdown.component';
import { AutocompleteComponent } from './fields/autocomplete/autocomplete.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    CommonModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    FormsModule, 
    HttpClientModule
  ],
  declarations: [
    FormBuilderComponent, 
    TextBoxComponent,
    DateComponent,
    RadioComponent,
    DropdownComponent,
    AutocompleteComponent
  ],
  exports: [FormBuilderComponent],
  providers: []
})
export class FormBuilderModule { }
