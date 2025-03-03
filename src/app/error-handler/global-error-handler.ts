import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private injector: Injector) {}

  handleError(error: any): void {
    const router = this.injector.get(Router);
    const snackBar = this.injector.get(MatSnackBar);

    if (error instanceof HttpErrorResponse) {
      console.error('HTTP Error:', error.message);
      this.showErrorMessage(snackBar, 'A network error occurred.');
    } else {
      console.error('Unexpected Error:', error);
      this.showErrorMessage(snackBar, 'An unexpected error occurred.');
    }

    router.navigate(['/error']).catch((err) => console.error('Navigation error:', err));
  }

  private showErrorMessage(snackBar: MatSnackBar, message: string) {
    snackBar.open(message, 'Close', {
      duration: 5000,
      panelClass: ['error-snackbar'],
    });
  }
}
