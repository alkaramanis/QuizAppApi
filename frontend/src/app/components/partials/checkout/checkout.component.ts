import { Component, Input, OnInit } from '@angular/core';
import { CheckoutService } from 'src/app/services/checkout.service';
import { CartItem } from 'src/shared/models/CartItem';
import { firstValueFrom } from 'rxjs';
import { Tour } from 'src/shared/models/Tour';
declare var Stripe: stripe.StripeStatic;
@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
})
export class CheckoutComponent implements OnInit {
  @Input() cartItems: CartItem[];
  constructor(private checkoutService: CheckoutService) {}

  ngOnInit(): void {}

  async bookTour() {
    let session;
    const stripe = Stripe(
      'pk_test_51MZX6DDVoS92akuf3I5fxCo6YdMBvnrbcMqL7gqgotqZhQyB2x2x4lxa8S5QisSPZ220y9f2Lk9tHygsnejrVUoa00jjPZMW0O'
    );
    // 1) Get checkout session from API
    session = await firstValueFrom(
      this.checkoutService.getCheckoutSession(this.cartItems)
    );

    await stripe.redirectToCheckout({
      sessionId: session.session.id,
    });
  }
}
