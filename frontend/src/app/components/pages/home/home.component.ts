import { Component, OnInit } from '@angular/core';
import { TourService } from 'src/app/services/tour.service';
import { Tour } from 'src/shared/models/Tour';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  tourObj: Tour[];
  constructor(private tour: TourService) {}

  ngOnInit(): void {
    this.getTours();
  }
  getTours() {
    this.tour.getAll().subscribe((res: any) => (this.tourObj = res.data.data));
  }
}
