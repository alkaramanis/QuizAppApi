import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { TourService } from 'src/app/services/tour.service';
import { TOURS_PATH } from 'src/shared/constants/urls';
import { Tour } from 'src/shared/models/Tour';
@Component({
  selector: 'app-tour-details',
  templateUrl: './tour-details.component.html',
  styleUrls: ['./tour-details.component.css'],
})
export class TourDetailsComponent implements OnInit {
  imagePath = TOURS_PATH;
  tour: Tour;
  constructor(
    private activatedRoute: ActivatedRoute,
    private tourServ: TourService,
    private cartServ: CartService,
    private router: Router
  ) {
    let tourObservable: Observable<Tour>;
    activatedRoute.params.subscribe((param) => {
      if (param.id) {
        tourObservable = this.tourServ.getById(param.id);
        tourObservable.subscribe((serverTour: any) => {
          this.tour = serverTour.data.data;
          console.log(this.tour);
        });
      }
    });
  }

  ngOnInit(): void {}

  addToCart() {
    this.cartServ.addToCart(this.tour);
    this.router.navigateByUrl('cart-page');
  }
}
