import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Tour } from 'src/shared/models/Tour';
import { Observable } from 'rxjs';
import { QueryParamModel } from 'src/shared/models/QueryParamModel';
@Injectable({
  providedIn: 'root',
})
export class TourService {
  getAll(filters: QueryParamModel[] = []): Observable<Tour[]> {
    let params = new HttpParams();
    filters.forEach((filter) => {
      params = params.append(filter.name, filter.value);
    });
    return this.http.get<Tour[]>(`http://127.0.0.1:8000/api/v1/tours`, {
      params: params,
    });
  }
  constructor(private http: HttpClient) {}

  getById(value: string): Observable<Tour> {
    return this.http.get<Tour>(`http://127.0.0.1:8000/api/v1/tours/${value}`);
  }
}
