import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { QueryParamModel } from 'src/shared/models/QueryParamModel';

@Component({
  selector: 'app-sorting',
  templateUrl: './sorting.component.html',
  styleUrls: ['./sorting.component.css'],
})
export class SortingComponent implements OnInit {
  @Input() filters: QueryParamModel[];
  @Output() filtersChange: EventEmitter<QueryParamModel[]> = new EventEmitter();

  text: string = 'Please select a filter';
  show: boolean = false;
  protected id: number;
  constructor(private router: Router) {}
  ngOnInit(): void {}
  onClick() {
    this.show = !this.show;
  }
  onFilterClick(
    queryParam: string,
    text: string = 'Price (Cheap first)',
    id = 1
  ) {
    this.id = id;
    this.text = text;
    const param: QueryParamModel = {
      name: 'sort',
      value: queryParam,
    };

    const objIndex = this.filters.findIndex((obj) => obj.name === 'sort');

    if (objIndex !== -1) {
      this.filters.splice(objIndex, 1);
    }
    this.filters.push(param);
    this.filtersChange.emit(this.filters);
  }
}
