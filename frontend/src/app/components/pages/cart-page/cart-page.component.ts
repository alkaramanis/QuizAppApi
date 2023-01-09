import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { TOURS_PATH } from 'src/shared/constants/urls';
import { Cart } from 'src/shared/models/Cart';
import { CartItem } from 'src/shared/models/CartItem';
@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.css'],
})
export class CartPageComponent implements OnInit {
  cart!: Cart;
  path = TOURS_PATH;
  constructor(private cartService: CartService) {
    this.cartService.getCartObservable().subscribe((cart) => {
      this.cart = cart;
      console.log(this.cart);
    });
  }

  ngOnInit(): void {}
  deleteCart() {
    this.cartService.clearCart();
  }
  changeQuanity(cartItem: CartItem, quantity: string) {
    const quantityInNumber = parseInt(quantity);
    console.log(cartItem.tour.id);
    this.cartService.changeQuantity(cartItem.tour.id, quantityInNumber);
  }
  removeFromCart(tourId: string) {
    this.cartService.removeFromCart(tourId);
  }
}
