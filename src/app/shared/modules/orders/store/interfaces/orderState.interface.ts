import { OrderInterface } from '../../interfaces/order.interface';

export interface OrderStateInterface {
  orders: OrderInterface[];
  currentOrder: OrderInterface;
  loading: boolean;
  error: string;
}
