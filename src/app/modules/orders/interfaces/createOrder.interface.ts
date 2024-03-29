import { OrderProductInterface } from './orderProduct.interface';

export interface CreateOrderInterface {
  clientId?: number;
  products: OrderProductInterface[];
  total: number;
  current: number;
}
