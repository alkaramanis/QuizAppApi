import { Component, OnInit, Input } from '@angular/core';
import { Reviews } from 'src/shared/models/Reviews';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css'],
})
export class ReviewsComponent implements OnInit {
  @Input() reviews: Reviews[];
  constructor() {}

  ngOnInit(): void {}
}
