import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  OnDestroy,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { TourService } from 'src/app/services/tour.service';
import { TOURS_PATH } from 'src/shared/constants/urls';
import { Tour } from 'src/shared/models/Tour';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/shared/models/User';

@Component({
  selector: 'app-tour-details',
  templateUrl: './tour-details.component.html',
  styleUrls: ['./tour-details.component.css'],
})
export class TourDetailsComponent implements OnInit {
  @ViewChild('slider') slider: ElementRef<HTMLDivElement>;
  @ViewChild('imagesContainer') imagesContainer: ElementRef<HTMLDivElement>;
  @ViewChild('sliderImage') sliderImage: ElementRef<HTMLImageElement>;
  lastVisibleChild: number = 6;
  fisrtVisibleChild: number = 1;
  imagePath = TOURS_PATH;
  user: User;
  clickedPhotoImage: string;
  lastIndex: number = 1;
  count = 0;
  tour: Tour;

  constructor(
    private activatedRoute: ActivatedRoute,
    private tourServ: TourService,
    private cartServ: CartService,
    private userServ: UserService,
    private router: Router
  ) {
    let tourObservable: Observable<Tour>;
    activatedRoute.params.subscribe((param) => {
      if (param.id) {
        this.lastViewed(param.id);
        tourObservable = this.tourServ.getById(param.id);
        tourObservable.subscribe((serverTour: any) => {
          this.tour = serverTour.data.data;
          this.tour.images.unshift(this.tour.imageCover);
        });
      }
    });
  }

  ngOnInit(): void {}
  lastViewed(id: string) {
    this.user = this.userServ.getUserFromLocalStorage();
    console.log(this.user);
    if (!this.user.lastToursSeen) this.user.lastToursSeen = [];
    if (this.user.lastToursSeen.length < 5) {
      if (this.user.lastToursSeen.includes(id)) return;
      this.user.lastToursSeen.push(id);
    } else {
      if (this.user.lastToursSeen.includes(id)) return;
      this.user.lastToursSeen.shift();
      this.user.lastToursSeen.push(id);
    }
    this.userServ.setUserToLocalStorage(this.user);
  }
  addToCart() {
    this.cartServ.addToCart(this.tour);
    this.router.navigateByUrl('cart-page');
  }
  onClick(e: any) {
    this.clearStyle();
    e.target.style.borderBottom = '5px solid #558ee2';
    this.lastIndex = parseInt(e.target.dataset.index);
    if (this.lastVisibleChild === +e.target.dataset.index) this.slide(1);
    if (this.fisrtVisibleChild === +e.target.dataset.index) this.slide(-1);
    this.clickedPhotoImage = e.target.id;
  }

  click(i: number) {
    if (this.lastVisibleChild === this.lastIndex + i) this.slide(1);
    if (this.fisrtVisibleChild === this.lastIndex + i) this.slide(-1);

    let imgEl = document.querySelector<HTMLImageElement>(
      `[data-index="${this.lastIndex + i}"]`
    );
    if (imgEl) {
      this.clearStyle();
      imgEl.style.borderBottom = '5px solid #558ee2';
      this.clickedPhotoImage = imgEl.id;
      this.lastIndex += i;
    } else {
      this.clearStyle();
      i > 0 ? (this.lastIndex = 1) : (this.lastIndex = this.tour.images.length);

      const imgEl = document.querySelector<HTMLImageElement>(
        `[data-index="${this.lastIndex}"]`
      );
      this.clickedPhotoImage = imgEl!.id;
      imgEl!.style.borderBottom = '5px solid #558ee2';
    }
  }
  clearStyle() {
    const img = document.querySelectorAll<HTMLElement>('.images-container img');
    img.forEach((img) => (img.style.borderBottom = ''));
  }
  slide(step: number) {
    this.count += step;
    if (this.count < 0) {
      this.count = 0;
      return;
    }
    this.slider.nativeElement.style.transform = `translateX(-${
      this.count * 19.2
    }rem)`;
    this.lastVisibleChild += step;
    this.fisrtVisibleChild += step;
  }
  // ngOnDestroy() {
  //   this.tour.images
  // }
}
