import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { DetailingForm } from '../models/detailing-form';

@Injectable({
  providedIn: 'root',
})
export class DetailingService {
  private apiUrl = 'http://localhost:3000/detailingRequests';
  hours = [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];

  constructor(private http: HttpClient) { }

  addDetailingRequest(detailingData: DetailingForm): Observable<DetailingForm> {
    return this.http.post<DetailingForm>(this.apiUrl, detailingData);
  }

  getAvailableHours(date: string | null): Observable<number[]> {
    if (!date) {
      return of(this.hours);
    }

    return this.http.get<DetailingForm[]>(this.apiUrl).pipe(
      map((requests) => {
        console.log('All requests:', requests);

        const filteredRequests = requests.filter((req) => {
          if (!req.date) return false;
          const reqDate = req.date.split('T')[0];
          return reqDate === date;
        });
        const bookedHours = filteredRequests.map((req) => Number(req.hour));

        return this.hours.filter((hour) => !bookedHours.includes(hour));
      }),
      catchError((error) => {
        console.error('Error fetching available hours:', error);
        return of(this.hours);
      })
    );
  }

}

