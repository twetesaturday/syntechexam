import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControlData, VitaminData, Vitamins } from '../../interfaces/form-interface';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(private http: HttpClient) { }

  getJSONFormData() {
    return  this.http
      .get<FormControlData>('/assets/formData.json');
  }

  getJSONVitaminData() {
    return  this.http
      .get<Vitamins>('/assets/vitaminData.json');
  }
}
