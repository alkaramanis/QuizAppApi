import { Component, OnInit } from '@angular/core';
import { TourService } from 'src/app/services/tour.service';
import { Tour } from 'src/shared/models/Tour';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  tourObj: Tour[];
  constructor(
    private tour: TourService,
    private activatedRoute: ActivatedRoute
  ) {
    activatedRoute.params.subscribe((param) => {
      if (param.searchTerm)
        this.tour
          .getAllToursBySearch(param.searchTerm)
          .subscribe((res: any) => (this.tourObj = [res.data.data]));
      else
        this.tour
          .getAll()
          .subscribe((res: any) => (this.tourObj = res.data.data));
    });
  }

  ngOnInit(): void {}
  getTours() {
    this.tour.getAll().subscribe((res: any) => (this.tourObj = res.data.data));
  }
}
