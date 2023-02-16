import { CartItem } from './CartItem';

export class Booking {
  id!: string;
  BookingItems!: CartItem[];
  totalPrice!: number;
  name!: string;
  createdAt!: string;
  status!: string;
}
