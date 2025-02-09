import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MechanicalForm } from '../models/mechanical-form';

@Injectable({
  providedIn: 'root',
})
export class MechanicalService {
  private apiUrl = 'http://localhost:3000/mechanicalRequests';

  constructor(private http: HttpClient) {}

  addMechanicalRequest(mechanicalData: MechanicalForm): Observable<MechanicalForm> {
    return this.http.post<MechanicalForm>(this.apiUrl, mechanicalData);
  }
}
