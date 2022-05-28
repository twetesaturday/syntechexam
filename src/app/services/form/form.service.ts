import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormControlData } from '../../interfaces/form-interface';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(private http: HttpClient) { }

  getJSONFormData() {
    return  this.http
      .get<FormControlData>('/assets/formData.json');
  }
}
