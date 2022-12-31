import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { TourService } from 'src/app/services/tour.service';
import { Tour } from 'src/shared/models/Tour';
@Component({
  selector: 'app-tour-details',
  templateUrl: './tour-details.component.html',
  styleUrls: ['./tour-details.component.css'],
})
export class TourDetailsComponent implements OnInit {
  tour: Tour;
  constructor(
    private activatedRoute: ActivatedRoute,
    private tourServ: TourService
  ) {
    let tourObservable: Observable<Tour>;
    activatedRoute.params.subscribe((paramId) => {
      if (paramId) {
        tourObservable = this.tourServ.getById(paramId.id);
        tourObservable.subscribe((serverTour: any) => {
          this.tour = serverTour.data.data;
        });
      }
    });
  }

  ngOnInit(): void {}
}
