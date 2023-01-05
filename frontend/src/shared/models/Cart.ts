import { CartItem } from './CartItem';

export class Cart {
  items: CartItem[] = [];
  totalprice: number = 0;
  totalQuantity: number = 0;
}
