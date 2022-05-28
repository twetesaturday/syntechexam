export type FormControlData = FormData[]

export interface FormData {
  id: string;
  label: string;
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
  customAnswer?: FormCustomAnswer[];
}

export interface FormOptionsGroup {
  key: string;
  names: string[];
}

export interface FormCustomAnswer {
  value: string;
}