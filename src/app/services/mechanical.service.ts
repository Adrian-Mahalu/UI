import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MechanicalFormInterface } from '../forms-interfaces/mechanical-form';

@Injectable({
  providedIn: 'root',
})
export class MechanicalService {
  private apiUrl = 'http://localhost:3000/mechanicalRequests';

  constructor(private http: HttpClient) {}

  addMechanicalRequest(mechanicalData: MechanicalFormInterface): Observable<MechanicalFormInterface> {
    return this.http.post<MechanicalFormInterface>(this.apiUrl, mechanicalData);
  }
}
