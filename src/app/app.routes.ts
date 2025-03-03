import { Routes } from '@angular/router';
import { CarServicesPageComponent } from './pages/car-services-page/car-services-page.component';
import { DetailingServiceComponent } from './pages/car-services-page/components/detailing-service/detailing-service.component';
import { MechanicalServiceComponent } from './pages/car-services-page/components/mechanical-service/mechanical-service.component';
import { ErrorComponent } from './pages/error/error.component';

export const routes: Routes = [
    { path: '', redirectTo: '/car-services', pathMatch: 'full' },
    { path: 'car-services', component: CarServicesPageComponent },
    { path: 'detailing-service', component: DetailingServiceComponent },
    { path: 'mechanical-service', component: MechanicalServiceComponent },
    { path: 'error', component: ErrorComponent }, 
    { path: '**', redirectTo: '/error' },
];
