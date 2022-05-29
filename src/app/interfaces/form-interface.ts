export type FormControlData = FormData[]
export type Vitamins = VitaminData[]

export interface FormData {
  id: string;
  label: string;
  section: string;
  type: string;
  options?: FormOption[];
  optionsGroup?: FormOptionsGroup[];
  multiline?: boolean;
  validators: FormValidators[];
}

export interface FormValidators {
  required?: boolean;
  minLength?: number;
  email?: boolean;
}

export interface FormOption {
  key: string;
  label: string;
  points?: number;
  customAnswer?: FormCustomAnswer[];
  subQuestion?: FormControlData
}

export interface FormOptionsGroup {
  key: string;
  names: string[];
}

export interface FormCustomAnswer {
  value: string;
}

export interface VitaminData {
  name: string;
  classification: string;
  function: string;
}