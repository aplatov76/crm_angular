import { CheckInterface } from 'src/app/interfaces/check.interface';
import { PaymentInterface } from './payment.interface';
import { ClientInterface } from '../../../interfaces/client.interface';
import { DeliveryInterface } from '../../delivery/interfaces/delivery.interface';
import { OrderProductInterface } from './orderProduct.interface';

export interface OrderInterface {
  id: number;
  total: number;
  current: number;
  data: Date;
  status: number;
  client: ClientInterface;
  orderpay: PaymentInterface[];
  orderdata: OrderProductInterface[] | null;
  /* если к заказу прикреплены продажи */
  check?: CheckInterface;
  delivery?: DeliveryInterface;
}
