import { Component, OnInit } from '@angular/core';
import { TourService } from 'src/app/services/tour.service';
import { UserService } from 'src/app/services/user.service';
import { Tour } from 'src/shared/models/Tour';
import { User } from 'src/shared/models/User';
import { TOURS_PATH } from 'src/shared/constants/urls';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  user: User = this.userServ.getUserFromLocalStorage();
  tour: Tour[] = [];
  url = TOURS_PATH;
  constructor(public userServ: UserService, private tourServ: TourService) {
    this.user.lastToursSeen.forEach((id) => {
      this.tourServ.getById(id).subscribe((res: any) => {
        this.tour.push(res.data.data);
        console.log(this.tour);
      });
    });
  }

  ngOnInit(): void {}
}
