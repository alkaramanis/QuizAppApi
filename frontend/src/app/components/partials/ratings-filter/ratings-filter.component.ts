import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { QueryParamModel } from 'src/shared/models/QueryParamModel';
@Component({
  selector: 'ratings-filter',
  templateUrl: './ratings-filter.component.html',
  styleUrls: ['./ratings-filter.component.css'],
})
export class RatingsFilterComponent implements OnInit {
  @Input() filters: QueryParamModel[] = [];
  @Output() filtersChange: EventEmitter<QueryParamModel[]> = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  onClick(e: any) {
    if (e.target.localName === 'input') {
      const inputs = document.querySelectorAll('input');
      inputs.forEach((input) => (input.checked = false));
      e.target.checked = true;

      const param: QueryParamModel = {
        name: 'ratingsAverage[gte]',
        value: e.target.value,
      };
      const objIndex = this.filters.findIndex(
        (obj) => obj.name === 'ratingsAverage[gte]'
      );

      if (objIndex !== -1) {
        this.filters.splice(objIndex, 1);
      }
      this.filters.push(param);
      this.filtersChange.emit(this.filters);
    }
  }
}
