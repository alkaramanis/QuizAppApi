import { Component, OnInit, Input } from '@angular/core';
import { Tour } from 'src/shared/models/Tour';
@Component({
  selector: 'price-ranger-slider',
  templateUrl: './price-ranger-slider.component.html',
  styleUrls: ['./price-ranger-slider.component.css'],
})
export class PriceRangerSliderComponent implements OnInit {
  @Input() tours: Tour[];

  minPrice: number;
  maxPrice: number;
  inputValue: number;
  inputValue2: number;
  constructor() {}

  ngOnInit(): void {
    this.minPrice = this.tours.reduce((prev, curr) =>
      prev.price < curr.price ? prev : curr
    ).price;
    this.maxPrice = this.tours.reduce((prev, curr) =>
      prev.price > curr.price ? prev : curr
    ).price;
  }
  onChange(e: any) {
    console.log(e.target.value);
    this.inputValue = e.target.value;
  }
  onChange2(e: any) {
    console.log(e.target.value);
    this.inputValue2 = e.target.value;
  }
}
