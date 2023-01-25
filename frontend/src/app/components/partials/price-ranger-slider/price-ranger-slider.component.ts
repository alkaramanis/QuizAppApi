import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Tour } from 'src/shared/models/Tour';
import { Options } from '@angular-slider/ngx-slider';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { QueryParamModel } from 'src/shared/models/QueryParamModel';
import { BehaviorSubject, filter, Observable } from 'rxjs';
import { QueryParamsService } from 'src/app/services/query-params.service';
@Component({
  selector: 'price-ranger-slider',
  templateUrl: './price-ranger-slider.component.html',
  styleUrls: ['./price-ranger-slider.component.css'],
})
export class PriceRangerSliderComponent implements OnInit {
  @Input() tours: Tour[];
  Filters: QueryParamModel[] = [];

  minPrice: number;
  maxPrice: number;
  options: Options;
  minValue: number;
  maxValue: number;

  constructor(
    private router: Router,
    private activateRoute: ActivatedRoute,
    private queryParamsServ: QueryParamsService
  ) {}

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

    const minObjIndex = this.Filters.findIndex(
      (obj) => obj.name === 'price[gte]'
    );

    if (minObjIndex !== -1) {
      this.Filters.splice(minObjIndex, 1);
    }
    const maxObjIndex = this.Filters.findIndex(
      (obj) => obj.name === 'price[lte]'
    );

    if (maxObjIndex !== -1) {
      this.Filters.splice(maxObjIndex, 1);
    }

    this.Filters.push(minParam);
    this.Filters.push(maxParam);

    this.queryParamsServ.queryParamsSubject.next(this.Filters);
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
