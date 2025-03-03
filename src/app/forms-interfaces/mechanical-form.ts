import { FormControl, FormGroup } from '@angular/forms';

export interface MechanicalFormInterface {
  lightChecks: boolean[];
  date: string | null;
  hour: string | null;
  description: string | null;
  fullName: string | null;
  phone: string | null;
  vin: string | null;
}

export type MechanicalForm = FormGroup<{
  [field in keyof MechanicalFormInterface]: FormControl<MechanicalFormInterface[field]>;
}>;
