import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTimepickerModule } from '@angular/material/timepicker';
import { MatCard, MatCardContent} from '@angular/material/card';
import { DetailingForm } from '../../../../models/detailing-form';
import { DetailingService } from '../../../../services/detailing.service';
import { AbstractControl, ValidationErrors } from '@angular/forms';

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
  encapsulation: ViewEncapsulation.None
})
export class DetailingServiceComponent implements OnInit {
  form: FormGroup;
  carBrands = ['BMW', 'Mercedes', 'Audi', 'Toyota', 'Ford', 'Volkswagen'];
  carBodyTypes = ['SUV','Break/Combi','Sedan/Berlina','Limousine','Cabrio','Coupe/GranCoupe','CrossOver','TANK', 'Hatchback'];
  availableHours: number[] = [];

  ngOnInit(): void {
    this.form.get('date')?.valueChanges.subscribe((selectedDate: Date) => {
      if (selectedDate) {
        const formattedDate = selectedDate.toLocaleDateString('en-CA');
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
      fullName: [null, Validators.required],
      phone: [null, [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[0-9]*$')]],
      carBrand: [null, Validators.required],
      bodyType: [null, Validators.required],
      packageOption: ['Basic package'],
      date: [null, [Validators.required, dateNotInPastValidator]],
      hour: [null, Validators.required]
    });
  }

  onSubmit() {
    if (this.form.valid) {
      const formData = this.form.value as DetailingForm;

      this.detailingService.addDetailingRequest(formData).subscribe({
        next: (response) => {
          console.log('Form data successfully submitted:', response);
          alert('Detailing request added successfully!');
          this.form.reset();
        },
        error: (err) => {
          console.error('Error submitting form:', err);
          alert('Failed to submit the detailing request. Please try again.');
        },
      });
    } else {
      console.error('Form is invalid');
      alert('Please fill out the form correctly.');
    }
  }
}

export function dateNotInPastValidator(control: AbstractControl): ValidationErrors | null {
  const selectedDate = control.value;
  if (selectedDate) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selected = new Date(selectedDate);
    if (selected < today) {
      return { dateInPast: true };
    }
  }
  return null;
}
