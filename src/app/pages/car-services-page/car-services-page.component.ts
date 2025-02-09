import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-car-services-page',
  standalone: true,
  imports: [RouterModule, MatCardModule],
  templateUrl: './car-services-page.component.html',
  styleUrl: './car-services-page.component.scss'
})
export class CarServicesPageComponent {

}
