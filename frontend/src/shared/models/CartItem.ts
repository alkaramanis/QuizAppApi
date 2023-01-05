import { Tour } from './Tour';

export class CartItem {
  constructor(public tour: Tour) {}
  quantity: number = 1;
  price: number = this.tour.price;
}
