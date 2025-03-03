import { FormControl, FormGroup } from '@angular/forms';

export interface DetailingFormInterface {
    fullName: string | null;
    phone: string | null;
    carBrand: string | null;
    bodyType: string | null;
    packageOption: string;
    date: string | null;
    hour: string | null;
  }

export type DetailingForm = FormGroup<{
  [field in keyof DetailingFormInterface]: FormControl<DetailingFormInterface[field]>;
}>;