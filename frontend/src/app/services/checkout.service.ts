import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import {
  CHECKOUT_URL,
  CREATE_BOOKING_CHECKOUT,
  GET_BOOKING,
} from 'src/shared/constants/urls';
import { CartItem } from 'src/shared/models/CartItem';

@Injectable({
  providedIn: 'root',
})
export class CheckoutService {
  private httpOptions = { withCredentials: true };
  constructor(private http: HttpClient) {}

  getCheckoutSession(cartItems: CartItem[]): Observable<any> {
    return this.http.post<any>(`${CHECKOUT_URL}`, cartItems, this.httpOptions);
  }
  createBookingCheckout(params: any): Observable<any> {
    console.log('serv');
    return this.http.get<any>(`${CREATE_BOOKING_CHECKOUT}`, {
      params,
      withCredentials: true,
    });
  }
  getMyBookings(): Observable<any> {
    return this.http.get<any>(`${GET_BOOKING}`);
  }
}
