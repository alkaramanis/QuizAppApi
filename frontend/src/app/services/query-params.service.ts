import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { QueryParamModel } from 'src/shared/models/QueryParamModel';

@Injectable({
  providedIn: 'root',
})
export class QueryParamsService {
  private queryParam: QueryParamModel[] = [];
  public queryParamsSubject: BehaviorSubject<QueryParamModel[]> =
    new BehaviorSubject(this.queryParam);

  constructor() {
    console.log(this.queryParamsSubject, this.queryParam);
  }
  QueryParamObservable(): Observable<QueryParamModel[]> {
    return this.queryParamsSubject.asObservable();
  }
}
