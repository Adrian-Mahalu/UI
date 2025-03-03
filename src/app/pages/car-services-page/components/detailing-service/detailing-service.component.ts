import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { MatCard, MatCardContent} from '@angular/material/card';
import { DetailingService } from '../../../../services/detailing.service';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { MAT_DATE_FORMATS, MAT_DATE_LOCALE, DateAdapter } from '@angular/material/core';
import { MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS } from '@angular/material-moment-adapter';
import { PACKAGE_DESCRIPTIONS } from '../../../../../utility/constants';
import moment from 'moment';
import { DetailingForm, DetailingFormInterface } from '../../../../forms-interfaces/detailing-form';


@Component({
  selector: 'app-detailing-service',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatRadioModule,
    MatDatepickerModule, MatNativeDateModule, MatInputModule,
    MatFormFieldModule, MatSelectModule, MatTimepickerModule,
    MatCard, MatCardContent
  ],
  templateUrl: './detailing-service.component.html',
  styleUrl: './detailing-service.component.scss',
  encapsulation: ViewEncapsulation.None,
  providers: [
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
    { provide: MAT_DATE_FORMATS, useValue: {
        parse: { dateInput: 'DD/MM/YYYY' },
        display: {
          dateInput: 'DD/MM/YYYY',
          monthYearLabel: 'MMMM YYYY',
          dateA11yLabel: 'LL',
          monthYearA11yLabel: 'MMMM YYYY'
        }
      }
    },
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } }
  ]
})

export class DetailingServiceComponent implements OnInit {
  form: FormGroup;
  carBrands = ['BMW', 'Mercedes', 'Audi', 'Toyota', 'Ford', 'Volkswagen'];
  carBodyTypes = ['SUV','Break/Combi','Sedan/Berlina','Limousine','Cabrio','Coupe/GranCoupe','CrossOver','TANK', 'Hatchback'];
  availableHours: number[] = [];
  descriptions = PACKAGE_DESCRIPTIONS;

  ngOnInit(): void {
    this.form.get('date')?.valueChanges.subscribe((selectedDate: Date) => {
      if (selectedDate) {
        const formattedDate = moment(selectedDate).format('DD-MM-YYYY');
        this.detailingService.getAvailableHours(formattedDate).subscribe({
          next: (hours) => {
            this.availableHours = hours;
          },
          error: (err) => {
            console.error('Error fetching available hours:', err);
            this.availableHours = [];
          }
        });
      } else {
        this.availableHours = [];
      }
    });
  }

  constructor(private fb: FormBuilder, private detailingService: DetailingService) {
    this.form = this.fb.group({
      fullName: new FormControl<string | null>(null, { nonNullable: true, validators: [Validators.required] }),
      phone: new FormControl<string | null>(null, { nonNullable: true, validators: [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[0-9]*$')] }),
      carBrand: new FormControl<string | null>(null, { nonNullable: true, validators: [Validators.required] }),
      bodyType: new FormControl<string | null>(null, { nonNullable: true, validators: [Validators.required] }),
      packageOption: new FormControl<string>('Basic package', { nonNullable: true }),
      date: new FormControl<string | null>(null, { nonNullable: true, validators: [Validators.required, dateNotInPastValidator] }),
      hour: new FormControl<string | null>(null, { nonNullable: true, validators: [Validators.required] })
    }) as DetailingForm;
    
  }

  onSubmit() {
    if (this.form.valid) {
      const formData = this.form.getRawValue() as DetailingFormInterface;
  
      this.detailingService.addDetailingRequest(formData).subscribe({
        next: (response) => {
          console.log('Form data successfully submitted:', response);
          this.form.reset();
        },
        error: (err) => {
          throw err;
        },
      });
    } else {
      console.error('Form is invalid');
    }
  }
}  

export function dateNotInPastValidator(control: AbstractControl): ValidationErrors | null {
  const selectedDate = control.value;
  if (selectedDate) {
    const today = moment().startOf('day');
    const selected = moment(selectedDate).startOf('day');

    if (selected.isBefore(today)) {
      return { dateInPast: true };
    }
  }
  return null;
}
