import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { UserService } from 'src/app/services/user.service';
import { AuthService } from 'src/app/services/auth.service';
import { Cart } from 'src/shared/models/Cart';
import { User } from 'src/shared/models/User';
import { USERS_PATH } from 'src/shared/constants/urls';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  islogged: boolean;
  quantity = 0;
  user: User;
  imagePath = USERS_PATH;

  constructor(
    private cartServ: CartService,
    private userService: UserService,
    private authService: AuthService
  ) {
    this.cartServ.getCartObservable().subscribe((newCart) => {
      this.quantity = newCart.totalQuantity;
    });
    this.userService.getUserObservable().subscribe((user) => {
      this.user = user;
    });
    this.authService.loggedInObservable().subscribe((logged) => {
      console.log(logged);
      this.islogged = logged;
    });
  }
  logout() {
    this.userService.logout().subscribe((res) => console.log(res));
  }
  ngOnInit(): void {}
}
