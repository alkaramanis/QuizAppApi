import { Component, OnInit } from '@angular/core';
import { TourService } from 'src/app/services/tour.service';
import { Tour } from 'src/shared/models/Tour';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  tours: Tour[] = [];
  tourObj: Tour;
  constructor(
    private tour: TourService,
    private activatedRoute: ActivatedRoute
  ) {
    let tourObservable: Observable<Tour[]>;
    activatedRoute.params.subscribe((param) => {
      if (param.searchTerm) {
        this.tourObj.findId(param.searchTerm, this.tours);
        tourObservable = this.tour.getAllToursBySearch(param.searchTerm);
      } else tourObservable = this.tour.getAll();
      tourObservable.subscribe((serverTours: any) => {
        this.tours = serverTours.data.data;
      });
    });
  }

  ngOnInit(): void {}
}
