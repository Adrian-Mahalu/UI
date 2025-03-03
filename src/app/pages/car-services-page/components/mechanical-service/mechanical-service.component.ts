import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatHint } from '@angular/material/form-field';
import { MechanicalForm, MechanicalFormInterface } from '../../../../forms-interfaces/mechanical-form';
import { MechanicalService } from '../../../../services/mechanical.service';

@Component({
  selector: 'app-mechanical-service',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatHint
  ],
  templateUrl: './mechanical-service.component.html',
  styleUrls: ['./mechanical-service.component.scss'],
})
export class MechanicalServiceComponent {
  form: FormGroup;
  lightChecks = ['Oil', 'Engine', 'Battery', 'Brakes', 'Other'];
  hours = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17];

  constructor(private fb: FormBuilder, private mechanicalService: MechanicalService) {
    this.form = this.fb.group({
      lightChecks: this.fb.array(this.lightChecks.map(() => new FormControl(false))),
      date: new FormControl<string | null>(null, { nonNullable: true }),
      hour: new FormControl<string | null>(null, { nonNullable: true }),
      description: new FormControl<string | null>(null, { nonNullable: true }),
      fullName: new FormControl<string | null>(null, { nonNullable: true }),
      phone: new FormControl<string | null>(null, { nonNullable: true }),
      vin: new FormControl<string | null>(null, { nonNullable: true }),
    });
  }
  
  get checks() {
    return this.form.get('lightChecks') as FormArray;
  }
  

  onSubmit() {
    if (this.form.valid) {
      const formData = this.form.value as MechanicalFormInterface;

      this.mechanicalService.addMechanicalRequest(formData).subscribe({
        next: (response) => {
          console.log('Form data successfully submitted:', response);
          alert('Mechnaical request added successfully!');
          this.form.reset();
        },
        error: (err) => {
          console.error('Error submitting form:', err);
          alert('Failed to submit the mechanical request. Please try again.');
        },
      });
    } else {
      console.error('Form is invalid');
      alert('Please fill out the form correctly.');
    }
  }
}
