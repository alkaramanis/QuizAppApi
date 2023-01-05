import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cart } from 'src/shared/models/Cart';
import { CartItem } from 'src/shared/models/CartItem';
import { Tour } from 'src/shared/models/Tour';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cart: Cart = this.getCartFromLocalStorage();
  private cartSubject: BehaviorSubject<Cart> = new BehaviorSubject(this.cart);
  constructor() {}

  addToCart(tour: Tour): void {
    let cartitem = this.cart.items.find((item) => item.tour.id === tour.id);
    if (cartitem) return;
    else this.cart.items.push(new CartItem(tour));
    this.setCartToLocalStorage();
  }
  removeFromCart(tourId: string) {
    this.cart.items = this.cart.items.filter((item) => {
      item.tour.id != tourId;
      this.setCartToLocalStorage();
    });
  }
  changeQuantity(tourId: string, quantity: number) {
    let cartItem = this.cart.items.find((item) => {
      item.tour.id = tourId;
      if (!cartItem) return;
      cartItem.quantity = quantity;
      cartItem.price = quantity * cartItem.tour.price;
      this.setCartToLocalStorage();
    });
  }
  clearCart() {
    this.cart = new Cart();
    this.setCartToLocalStorage();
  }
  getCartObservable(): Observable<Cart> {
    return this.cartSubject.asObservable();
  }
  private setCartToLocalStorage(): void {
    this.cart.totalprice = this.cart.items.reduce(
      (prevSum, curItem) => prevSum + curItem.price,
      0
    );
    this.cart.totalQuantity = this.cart.items.reduce(
      (prevSum, curItem) => prevSum + curItem.quantity,
      0
    );
    const cartJson = JSON.stringify(this.cart);
    localStorage.setItem('Cart', cartJson);
    this.cartSubject.next(this.cart);
  }
  private getCartFromLocalStorage(): Cart {
    const cartJson = localStorage.getItem('Cart');
    return cartJson ? JSON.parse(cartJson) : new Cart();
  }
}
