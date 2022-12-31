import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Tour } from 'src/shared/models/Tour';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class TourService {
  getAll(param = {}): Observable<Tour[]> {
    return this.http.get<Tour[]>(`http://127.0.0.1:8000/api/v1/tours`, {
      params: param,
    });
  }
  constructor(private http: HttpClient) {}

  getById(value: string): Observable<Tour> {
    return this.http.get<Tour>(`http://127.0.0.1:8000/api/v1/tours/${value}`);
  }
}
