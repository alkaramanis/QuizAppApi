import { Component, OnInit } from '@angular/core';
import { TourService } from 'src/app/services/tour.service';
import { UserService } from 'src/app/services/user.service';
import { Tour } from 'src/shared/models/Tour';
import { User } from 'src/shared/models/User';
import { TOURS_PATH } from 'src/shared/constants/urls';
import { ActivatedRoute } from '@angular/router';
import { CheckoutService } from 'src/app/services/checkout.service';
import { Router } from '@angular/router';
import { Booking } from 'src/shared/models/Booking';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  booking: Booking = new Booking();
  user: User = this.userServ.getUserFromLocalStorage();
  tour: Tour[] = [];
  url = TOURS_PATH;
  constructor(
    public userServ: UserService,
    private tourServ: TourService,
    private activatedRoute: ActivatedRoute,
    private checkoutSer: CheckoutService,
    private router: Router
  ) {
    if (this.user.lastToursSeen)
      this.user.lastToursSeen.forEach((id) => {
        this.tourServ.getById(id).subscribe((res: any) => {
          this.tour.push(res.data.data);
          console.log(this.tour);
        });
      });
    this.activatedRoute.queryParams.subscribe((param) => {
      this.router.navigateByUrl('/dashboard');
      if (param.order)
        this.checkoutSer.createBookingCheckout(param).subscribe((res) => {
          this.booking = res;
        });
    });
    this.checkoutSer.getMyBookings().subscribe((res) => {
      console.log(res);
      this.booking = res;
    });
  }

  ngOnInit(): void {}
}
