import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { ErrorHandler } from '@angular/core';
import { GlobalErrorHandler } from './app/error-handler/global-error-handler';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(routes),
    provideAnimations(),
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
  ],
}).catch((err) => console.error(err));
