import { Component, OnInit } from '@angular/core';
import { TourService } from 'src/app/services/tour.service';
import { Tour } from 'src/shared/models/Tour';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { TOURS_PATH } from 'src/shared/constants/urls';
import { QueryParamModel } from 'src/shared/models/QueryParamModel';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  filters: QueryParamModel[] = [];
  filtersSub: BehaviorSubject<QueryParamModel[]> = new BehaviorSubject(
    this.filters
  );
  path = TOURS_PATH;
  protected tours: Tour[] = [];
  tourObj: Tour;
  constructor(
    private tour: TourService,
    private activatedRoute: ActivatedRoute
  ) {
    let tourObservable: Observable<Tour[]>;

    this.filtersSub.subscribe((param) => {
      if (Object.keys(param).length === 0) {
        tourObservable = this.tour.getAll();
      } else {
        tourObservable = this.tour.getAll(param);
      }
      tourObservable.subscribe((serverTours: any) => {
        this.tours = serverTours.data.data;
      });
    });
  }

  ngOnInit(): void {}

  onChange(e: QueryParamModel[]) {
    this.filtersSub.next(e);
  }
}
