import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { Cart } from 'src/shared/models/Cart';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  quantity = 0;

  constructor(private cartServ: CartService, private userService: UserService) {
    cartServ.getCartObservable().subscribe((newCart) => {
      this.quantity = newCart.totalQuantity;
    });

    userService.getMyProfile().subscribe();
  }

  ngOnInit(): void {}
}
