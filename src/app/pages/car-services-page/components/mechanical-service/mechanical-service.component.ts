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
import { MechanicalForm } from '../../../../models/mechanical-form';
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
      fullName: [null, Validators.required],
      phone: [null, [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[0-9]*$')]],
      lightChecks: this.fb.array(this.lightChecks.map(() => this.fb.control(false))),
      date: [null, Validators.required],
      hour: [null, Validators.required],
      description: ['', [Validators.maxLength(200)]],
      vin: ['', [Validators.required, Validators.minLength(17), Validators.maxLength(17)]]
    });
  }

  get checks() {
    return this.form.get('lightChecks') as FormArray;
  }

  onSubmit() {
    if (this.form.valid) {
      const formData = this.form.value as MechanicalForm;

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
