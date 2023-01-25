import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Tour } from 'src/shared/models/Tour';
import { Options } from '@angular-slider/ngx-slider';
import { QueryParamModel } from 'src/shared/models/QueryParamModel';

@Component({
  selector: 'price-ranger-slider',
  templateUrl: './price-ranger-slider.component.html',
  styleUrls: ['./price-ranger-slider.component.css'],
})
export class PriceRangerSliderComponent implements OnInit {
  @Input() tours: Tour[];
  @Input() filters: QueryParamModel[] = [];
  @Output() filtersChange: EventEmitter<QueryParamModel[]> = new EventEmitter();

  minPrice: number;
  maxPrice: number;
  options: Options;
  minValue: number;
  maxValue: number;

  constructor() {}

  ngOnInit(): void {
    this.minPrice = this.findminPrice().price;
    this.maxPrice = this.findmaxPrice().price;
    this.options = {
      floor: this.minPrice,
      ceil: this.maxPrice,
      getPointerColor() {
        return '#e67d22d7';
      },
      selectionBarGradient: {
        from: 'white',
        to: 'rgb(255, 204, 0)',
      },
    };
  }
  onChange() {
    const minParam: QueryParamModel = {
      name: 'price[gte]',
      value: this.minPrice,
    };
    const maxParam: QueryParamModel = {
      name: 'price[lte]',
      value: this.maxPrice,
    };

    const minObjIndex = this.filters.findIndex(
      (obj) => obj.name === 'price[gte]'
    );

    if (minObjIndex !== -1) {
      this.filters.splice(minObjIndex, 1);
    }
    const maxObjIndex = this.filters.findIndex(
      (obj) => obj.name === 'price[lte]'
    );

    if (maxObjIndex !== -1) {
      this.filters.splice(maxObjIndex, 1);
    }

    this.filters.push(minParam);
    this.filters.push(maxParam);

    this.filtersChange.emit(this.filters);
  }
  findminPrice(): Tour {
    return this.tours.reduce((prev, curr) =>
      prev.price < curr.price ? prev : curr
    );
  }
  findmaxPrice(): Tour {
    return this.tours.reduce((prev, curr) =>
      prev.price > curr.price ? prev : curr
    );
  }
}
